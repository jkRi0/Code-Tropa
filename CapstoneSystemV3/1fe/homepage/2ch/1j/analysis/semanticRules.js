// Expanded Semantic Rules v2 (exposes window.SEMANTIC_RULES_V2)
window.SEMANTIC_RULES_V2 = [
  {id:'assignment-in-if',severity:'error',title:'Assignment in if',desc:"Using '=' in if condition — probably meant '=='.",match:/if\s*\([^)]*=[^=][^)]*\)/},
  {id:'string-compare-equals',severity:'warn',title:'String comparison using ==',desc:'Use .equals() to compare strings.',match:/==\s*\"|\"\s*==/},
  {id:'system-print-empty',severity:'error',title:'System.out.print() no args',desc:'System.out.print() needs an argument; use println() for newline.',match:/System\s*\.\s*out\s*\.\s*print\s*\(\s*\)/},
  {id:'suspicious-cast',severity:'warn',title:'Suspicious cast between unrelated types',desc:'Casting between unrelated boxed types looks wrong, e.g. (String) new Integer(5).',match:/\(\s*(String|Integer|Double|Long)\s*\)\s*new\s+(Integer|String|Double|Long)\b/},
  {id:'this-in-static',severity:'error',title:'Using this in static context',desc:'The keyword this cannot be used inside static methods.',match:/static[^{;]*\{[\s\S]*\bthis\b/},
  {id:'null-check-equals',severity:'warn',title:'Null check using equals',desc:'Null checks should use == or Objects.equals to avoid NPE.',match:/\w+\.equals\s*\(\s*null\s*\)/},
  {id:'for-each-on-non-iterable',severity:'error',title:'For-each on non-iterable',desc:'Enhanced for loop used on a type that is not an array or Iterable (heuristic).',match:/for\s*\(\s*[^:]+:[^)]+\)/},
  {id:'break-outside-loop',severity:'error',title:'break outside loop/switch',desc:'break used outside loop or switch (detected heuristically).',match:/[^\{;\n]*\bbreak\b\s*;/},
  {id:'continue-outside-loop',severity:'error',title:'continue outside loop',desc:'continue used outside loop (heuristic).',match:/\bcontinue\b\s*;/}
];
