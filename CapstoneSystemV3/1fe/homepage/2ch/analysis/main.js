// Main v2 — combines v2 modules and runs many checks
(function(){
  function collectIssues(code){
    const lines=code.split('\n'); let issues=[];
    const syntax=window.SYNTAX_RULES_V2||[]; const sem=window.SEMANTIC_RULES_V2||[]; const struct=window.STRUCTURE_HELPERS_V2||{};

    // run syntax and semantic rules (line-based)
    syntax.forEach(rule=>{ lines.forEach((line,i)=>{ try{ if(rule.match.test(line)) issues.push(Object.assign({line:i+1,excerpt:line.trim()},rule)); }catch(e){} }); });
    sem.forEach(rule=>{ lines.forEach((line,i)=>{ try{ if(rule.match.test(line)) issues.push(Object.assign({line:i+1,excerpt:line.trim()},rule)); }catch(e){} }); });

    // structure checks
    if(struct.checkBalancedChars) issues = issues.concat(struct.checkBalancedChars(code));
    if(struct.findMultiplePublicClasses) issues = issues.concat(struct.findMultiplePublicClasses(code));
    if(struct.findMethodNesting) issues = issues.concat(struct.findMethodNesting(code));

    // advanced heuristics
    issues = issues.concat(detectMissingReturn(code));
    issues = issues.concat(detectUnreachableAfterReturn(code));
    issues = issues.concat(detectDuplicateCaseLabels(code));

    // dedupe
    const seen={}; issues = issues.filter(it=>{ const k=[it.id,it.line,it.excerpt||''].join('|'); if(seen[k]) return false; seen[k]=true; return true; }).sort((a,b)=>a.line-b.line||(a.severity==='error'?-1:1));
    return issues;
  }

  // detect missing return in non-void methods (heuristic)
  function detectMissingReturn(code){
    const issues=[]; const methodRegex=/\b(public|protected|private)?\s*(static\s+)?([\w<>\[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*\{/g; let m;
    while((m=methodRegex.exec(code))!==null){
      const returnType=m[3]; const name=m[4]; const start=m.index; if(returnType==='void') continue;
      // find method body
      let depth=0; let found=false; for(let i=start;i<code.length;i++){ if(code[i]==='{') depth++; else if(code[i]==='}') depth--; if(code.substring(i,i+6)==='return') found=true; if(depth===0 && i>start) break; }
      if(!found) issues.push({id:'missing-return',severity:'error',title:'Missing return in method',desc:`Method '${name}' declares return type '${returnType}' but no return found (heuristic).`,line:findLineOfIndex(code,start)});
    }
    return issues;
  }

  // detect statements after return in same block (unreachable)
  function detectUnreachableAfterReturn(code){
    const issues=[]; const lines=code.split('\n');
    for(let i=0;i<lines.length;i++){
      if(/\breturn\b/.test(lines[i])){
        // scan until next closing brace on same indentation level
        for(let j=i+1;j<lines.length && j<i+6;j++){
          if(lines[j].trim()!=='' && !/^\s*\/\//.test(lines[j])) issues.push({id:'unreachable-code',severity:'warn',title:'Code after return',desc:'Code after return is unreachable (within nearby lines).',line:j+1,excerpt:lines[j].trim()});
        }
      }
    }
    return issues;
  }

  // detect duplicate case labels inside switches (heuristic)
  function detectDuplicateCaseLabels(code){
    const issues=[]; const switchRegex=/switch\s*\(([^)]+)\)\s*\{/g; let m;
    while((m=switchRegex.exec(code))!==null){
      const start=m.index; const bodyStart=code.indexOf('{',start); if(bodyStart<0) continue; let depth=0; let i=bodyStart; const labels={};
      for(;i<code.length;i++){
        if(code[i]==='{') depth++; else if(code[i]==='}') depth--; if(depth===0) break;
        const sub = code.substring(i,i+10);
        const caseMatch = code.substring(i).match(/case\s+([^:]+)\s*:/);
        if(caseMatch){ const lbl=caseMatch[1].trim(); if(labels[lbl]) issues.push({id:'duplicate-case',severity:'error',title:'Duplicate case label',desc:`Case label ${lbl} repeated in same switch.`,line:findLineOfIndex(code,start)}); labels[lbl]=true; }
      }
    }
    return issues;
  }

  function findLineOfIndex(entire, idx){ return entire.substring(0,idx).split('\n').length; }

  // UI binding: attach to Analyze button (if present)
  const analyzeBtn = document.getElementById('analyzeBtn'); if(analyzeBtn){ analyzeBtn.addEventListener('click',()=>{
    const code = document.getElementById('codeInput').value; const issues = collectIssues(code);
    const out = document.getElementById('results'); out.innerHTML=''; let e=0,w=0,info=0; if(issues.length===0) out.innerHTML='<div class="result sev-info">No issues detected.</div>';
    issues.forEach(it=>{ const div=document.createElement('div'); div.className='result '+(it.severity==='error'?'sev-error':(it.severity==='warn'?'sev-warn':'sev-info')); div.innerHTML=`<div style="display:flex;justify-content:space-between"><div><strong>${escapeHtml(it.title)}</strong> <span class="meta">(id: ${it.id})</span></div><div class="meta">line ${it.line}</div></div><div style="margin-top:6px">${escapeHtml(it.desc)}</div><pre class='excerpt'>${escapeHtml(it.excerpt||'')}</pre>`; out.appendChild(div); if(it.severity==='error') e++; else if(it.severity==='warn') w++; else info++; });
    document.getElementById('countErrors').textContent='Errors: '+e; document.getElementById('countWarns').textContent='Warnings: '+w;
  }); }

  function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>\"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]); }
})();

// NOTE: The analyzer may produce false positives for reserved words and string literals.
// For example, it may mark `public static void main(String[] args)` as a reserved-word identifier,
// and flag properly closed strings like System.out.print("") as unclosed.
// These can be fixed by refining regexes in syntaxRules_v2.js —
// e.g., check reserved words only when used as identifiers, and count quotes properly.
