// Structure Helpers v2 (exposes window.STRUCTURE_HELPERS_V2)
window.STRUCTURE_HELPERS_V2 = (function(){
  function checkBalancedChars(text){
    const stack=[];const pairs={')':'(',']':'[','}':'{'};const issues=[];const lines=text.split('\n');
    for(let ln=0;ln<lines.length;ln++){
      const line=lines[ln];
      for(let i=0;i<line.length;i++){
        const c=line[i];
        if(c==='('||c==='['||c==='{') stack.push({c,line:ln+1});
        else if(c===')'||c===']'||c==='}'){
          const top=stack.pop();
          if(!top || top.c!==pairs[c]) issues.push({id:'brace-mismatch',severity:'error',title:'Mismatched brace',desc:`Found '${c}' at line ${ln+1} without matching opening.`,line:ln+1,excerpt:line.trim()});
        }
      }
    }
    while(stack.length>0){const left=stack.pop(); issues.push({id:'unclosed-open',severity:'error',title:'Unclosed '+left.c,desc:`Opening '${left.c}' at line ${left.line} has no closing match.`,line:left.line});}
    return issues;
  }

  function findMultiplePublicClasses(text){
    const matches = text.match(/\bpublic\s+class\s+(\w+)/g) || [];
    if(matches.length>1) return [{id:'multiple-public-classes',severity:'error',title:'Multiple public classes',desc:'More than one public class in a single file is not allowed.',line:1}];
    return [];
  }

  function findMethodNesting(text){
    // crude: find a method signature inside another method body
    const lines=text.split('\n'); const issues=[];
    for(let i=0;i<lines.length;i++){
      if(/\)\s*\{/.test(lines[i])){
        // scan following lines for method signature before matching brace closes
        let depth=0; for(let j=i;j<lines.length;j++){
          if(/\{/.test(lines[j])) depth++;
          if(/\}/.test(lines[j])) depth--;
          if(depth>0 && /\b(public|private|protected)\s+\w+\s+\w+\s*\(/.test(lines[j])){
            issues.push({id:'method-inside-method',severity:'error',title:'Method declared inside method',desc:'Found method-like declaration inside a method body (not allowed).',line:j+1,excerpt:lines[j].trim()});
          }
          if(depth<=0) break;
        }
      }
    }
    return issues;
  }

  return { checkBalancedChars, findMultiplePublicClasses, findMethodNesting };
})();
