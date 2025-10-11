function onParse() {
  const code = document.getElementById("code").value;
  const output = document.getElementById("output");

  try {
    const chars = new antlr4.InputStream(code);
    const lexer = new JavaLexer.JavaLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new JavaParser.JavaParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.compilationUnit();

    output.textContent = "Parse successful!\n" + tree.toStringTree(parser.ruleNames);
  } catch (err) {
    output.textContent = "Exception: " + err;
  }
}
