#!/usr/bin/env node
/**
 * parse_ast.js
 *
 * Usage:
 *   node parse_ast.js /path/to/AST.txt
 *
 * Reads an indentation-based AST text file and:
 *  - builds a structured JSON AST
 *  - prints JSON (pretty)
 *  - runs a heuristic Java code generator to reconstruct Java source (best-effort)
 *
 * The AST format expected is similar to the uploaded AST: each line represents
 * a node. Indentation indicates parent/child relationship. Lines may be:
 *   - "nodeType: value"
 *   - "nodeType" (no value)
 *
 * The parser preserves order and attaches children to parent nodes.
 */



const raw = `

compilationUnit: <EOF>
  typeDeclaration
    classOrInterfaceModifier: public
    classDeclaration: class
      identifier: MainDemo
      classBody: { }
        classBodyDeclaration
          modifier
            classOrInterfaceModifier: public
          modifier
            classOrInterfaceModifier: static
          memberDeclaration
            methodDeclaration
              typeTypeOrVoid: void
              identifier: main
              formalParameters
                null
                  formalParameter
                    typeType: [ ]
                      classOrInterfaceType
                        classType
                          typeIdentifier: String
                    variableDeclaratorId
                      identifier: args
              methodBody
                block: { }
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: byte
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: byteVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 10
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: short
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: shortVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 300
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: intVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 50000
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: long
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: longVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 90000000000L
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: float
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: floatVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  floatLiteral: 3.14f
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: double
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: doubleVar
                          variableInitializer
                            expression
                              primary
                                literal
                                  floatLiteral: 3.14159265359
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: char
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: charVar
                          variableInitializer
                            expression
                              primary
                                literal: 'A'
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: boolean
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: boolVar
                          variableInitializer
                            expression
                              primary
                                literal: true
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        classOrInterfaceType
                          classType
                            typeIdentifier: String
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: stringVar
                          variableInitializer
                            expression
                              primary
                                literal: "Hello Java!"
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        classOrInterfaceType
                          classType
                            typeIdentifier: Integer
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: wrapperInt
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 42
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        classOrInterfaceType
                          classType
                            typeIdentifier: Double
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: wrapperDouble
                          variableInitializer
                            expression
                              primary
                                literal
                                  floatLiteral: 10.5
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        classOrInterfaceType
                          classType
                            typeIdentifier: Boolean
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: wrapperBoolean
                          variableInitializer
                            expression
                              primary
                                literal: false
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "=== PRIMITIVES ==="
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "byte: "
                                  expression
                                    primary
                                      identifier: byteVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "short: "
                                  expression
                                    primary
                                      identifier: shortVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "int: "
                                  expression
                                    primary
                                      identifier: intVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "long: "
                                  expression
                                    primary
                                      identifier: longVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "float: "
                                  expression
                                    primary
                                      identifier: floatVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "double: "
                                  expression
                                    primary
                                      identifier: doubleVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "char: "
                                  expression
                                    primary
                                      identifier: charVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "boolean: "
                                  expression
                                    primary
                                      identifier: boolVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "\n=== NON-PRIMITIVES ==="
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "String: "
                                  expression
                                    primary
                                      identifier: stringVar
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "Integer wrapper: "
                                  expression
                                    primary
                                      identifier: wrapperInt
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "Double wrapper: "
                                  expression
                                    primary
                                      identifier: wrapperDouble
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "Boolean wrapper: "
                                  expression
                                    primary
                                      identifier: wrapperBoolean
                  blockStatement: ;
                    localVariableDeclaration
                      typeType: [ ]
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: numArray
                          variableInitializer
                            arrayInitializer: { , , , , }
                              variableInitializer
                                expression
                                  primary
                                    literal
                                      integerLiteral: 1
                              variableInitializer
                                expression
                                  primary
                                    literal
                                      integerLiteral: 2
                              variableInitializer
                                expression
                                  primary
                                    literal
                                      integerLiteral: 3
                              variableInitializer
                                expression
                                  primary
                                    literal
                                      integerLiteral: 4
                              variableInitializer
                                expression
                                  primary
                                    literal
                                      integerLiteral: 5
                  blockStatement: ;
                    localVariableDeclaration
                      typeType: [ ]
                        classOrInterfaceType
                          classType
                            typeIdentifier: String
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: strArray
                          variableInitializer
                            arrayInitializer: { , , }
                              variableInitializer
                                expression
                                  primary
                                    literal: "One"
                              variableInitializer
                                expression
                                  primary
                                    literal: "Two"
                              variableInitializer
                                expression
                                  primary
                                    literal: "Three"
                  blockStatement: ;
                    localVariableDeclaration
                      typeType: [ ] [ ]
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: matrix
                          variableInitializer
                            arrayInitializer: { , }
                              variableInitializer
                                arrayInitializer: { , , }
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 1
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 2
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 3
                              variableInitializer
                                arrayInitializer: { , , }
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 4
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 5
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 6
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "\n1D Array: "
                  blockStatement
                    statement: for
                      null
                        forControl
                          enhancedForControl: :
                            typeType
                              primitiveType: int
                            variableDeclaratorId
                              identifier: num
                            expression
                              primary
                                identifier: numArray
                      statement: ;
                        expression: .
                          expression: .
                            expression
                              primary
                                identifier: System
                            identifier: out
                          methodCall
                            identifier: print
                            arguments
                              null
                                expressionList
                                  expression: +
                                    expression
                                      primary
                                        identifier: num
                                    expression
                                      primary
                                        literal: " "
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "String Array: "
                  blockStatement
                    statement: for
                      null
                        forControl
                          enhancedForControl: :
                            typeType
                              classOrInterfaceType
                                classType
                                  typeIdentifier: String
                            variableDeclaratorId
                              identifier: s
                            expression
                              primary
                                identifier: strArray
                      statement: ;
                        expression: .
                          expression: .
                            expression
                              primary
                                identifier: System
                            identifier: out
                          methodCall
                            identifier: print
                            arguments
                              null
                                expressionList
                                  expression: +
                                    expression
                                      primary
                                        identifier: s
                                    expression
                                      primary
                                        literal: " "
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "2D Array:"
                  blockStatement
                    statement: for
                      null
                        forControl: ; ;
                          forInit
                            localVariableDeclaration
                              typeType
                                primitiveType: int
                              variableDeclarators
                                variableDeclarator: =
                                  variableDeclaratorId
                                    identifier: i
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 0
                          expression: <
                            expression
                              primary
                                identifier: i
                            expression: .
                              expression
                                primary
                                  identifier: matrix
                              identifier: length
                          expressionList
                            expression: ++
                              expression
                                primary
                                  identifier: i
                      statement
                        block: { }
                          blockStatement
                            statement: for
                              null
                                forControl: ; ;
                                  forInit
                                    localVariableDeclaration
                                      typeType
                                        primitiveType: int
                                      variableDeclarators
                                        variableDeclarator: =
                                          variableDeclaratorId
                                            identifier: j
                                          variableInitializer
                                            expression
                                              primary
                                                literal
                                                  integerLiteral: 0
                                  expression: <
                                    expression
                                      primary
                                        identifier: j
                                    expression: .
                                      expression: [ ]
                                        expression
                                          primary
                                            identifier: matrix
                                        expression
                                          primary
                                            identifier: i
                                      identifier: length
                                  expressionList
                                    expression: ++
                                      expression
                                        primary
                                          identifier: j
                              statement
                                block: { }
                                  blockStatement
                                    statement: ;
                                      expression: .
                                        expression: .
                                          expression
                                            primary
                                              identifier: System
                                          identifier: out
                                        methodCall
                                          identifier: print
                                          arguments
                                            null
                                              expressionList
                                                expression: +
                                                  expression: [ ]
                                                    expression: [ ]
                                                      expression
                                                        primary
                                                          identifier: matrix
                                                      expression
                                                        primary
                                                          identifier: i
                                                    expression
                                                      primary
                                                        identifier: j
                                                  expression
                                                    primary
                                                      literal: " "
                          blockStatement
                            statement: ;
                              expression: .
                                expression: .
                                  expression
                                    primary
                                      identifier: System
                                  identifier: out
                                methodCall
                                  identifier: println
                                  arguments
                                    null
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: value
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 10
                  blockStatement
                    statement: if else
                      null
                        expression: >
                          expression
                            primary
                              identifier: value
                          expression
                            primary
                              literal
                                integerLiteral: 5
                      statement
                        block: { }
                          blockStatement
                            statement: ;
                              expression: .
                                expression: .
                                  expression
                                    primary
                                      identifier: System
                                  identifier: out
                                methodCall
                                  identifier: println
                                  arguments
                                    null
                                      expressionList
                                        expression
                                          primary
                                            literal: "\nValue is greater than 5"
                      statement
                        block: { }
                          blockStatement
                            statement: ;
                              expression: .
                                expression: .
                                  expression
                                    primary
                                      identifier: System
                                  identifier: out
                                methodCall
                                  identifier: println
                                  arguments
                                    null
                                      expressionList
                                        expression
                                          primary
                                            literal: "\nValue is 5 or less"
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: day
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 3
                  blockStatement
                    statement
                      switchExpression: switch { }
                        null
                          expression
                            primary
                              identifier: day
                        switchLabeledRule: case ->
                          expressionList
                            expression
                              primary
                                literal
                                  integerLiteral: 1
                          switchRuleOutcome
                            blockStatement
                              statement: ;
                                expression: .
                                  expression: .
                                    expression
                                      primary
                                        identifier: System
                                    identifier: out
                                  methodCall
                                    identifier: println
                                    arguments
                                      null
                                        expressionList
                                          expression
                                            primary
                                              literal: "Monday"
                        switchLabeledRule: case ->
                          expressionList
                            expression
                              primary
                                literal
                                  integerLiteral: 2
                          switchRuleOutcome
                            blockStatement
                              statement: ;
                                expression: .
                                  expression: .
                                    expression
                                      primary
                                        identifier: System
                                    identifier: out
                                  methodCall
                                    identifier: println
                                    arguments
                                      null
                                        expressionList
                                          expression
                                            primary
                                              literal: "Tuesday"
                        switchLabeledRule: case ->
                          expressionList
                            expression
                              primary
                                literal
                                  integerLiteral: 3
                          switchRuleOutcome
                            blockStatement
                              statement: ;
                                expression: .
                                  expression: .
                                    expression
                                      primary
                                        identifier: System
                                    identifier: out
                                  methodCall
                                    identifier: println
                                    arguments
                                      null
                                        expressionList
                                          expression
                                            primary
                                              literal: "Wednesday"
                        switchLabeledRule: default ->
                          switchRuleOutcome
                            blockStatement
                              statement: ;
                                expression: .
                                  expression: .
                                    expression
                                      primary
                                        identifier: System
                                    identifier: out
                                  methodCall
                                    identifier: println
                                    arguments
                                      null
                                        expressionList
                                          expression
                                            primary
                                              literal: "Another day"
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "\nFor Loop: "
                  blockStatement
                    statement: for
                      null
                        forControl: ; ;
                          forInit
                            localVariableDeclaration
                              typeType
                                primitiveType: int
                              variableDeclarators
                                variableDeclarator: =
                                  variableDeclaratorId
                                    identifier: i
                                  variableInitializer
                                    expression
                                      primary
                                        literal
                                          integerLiteral: 1
                          expression: <=
                            expression
                              primary
                                identifier: i
                            expression
                              primary
                                literal
                                  integerLiteral: 5
                          expressionList
                            expression: ++
                              expression
                                primary
                                  identifier: i
                      statement: ;
                        expression: .
                          expression: .
                            expression
                              primary
                                identifier: System
                            identifier: out
                          methodCall
                            identifier: print
                            arguments
                              null
                                expressionList
                                  expression: +
                                    expression
                                      primary
                                        identifier: i
                                    expression
                                      primary
                                        literal: " "
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "While Loop: "
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: w
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 1
                  blockStatement
                    statement: while
                      null
                        expression: <=
                          expression
                            primary
                              identifier: w
                          expression
                            primary
                              literal
                                integerLiteral: 5
                      statement
                        block: { }
                          blockStatement
                            statement: ;
                              expression: .
                                expression: .
                                  expression
                                    primary
                                      identifier: System
                                  identifier: out
                                methodCall
                                  identifier: print
                                  arguments
                                    null
                                      expressionList
                                        expression: +
                                          expression
                                            primary
                                              identifier: w
                                          expression
                                            primary
                                              literal: " "
                          blockStatement
                            statement: ;
                              expression: ++
                                expression
                                  primary
                                    identifier: w
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "Do-While Loop: "
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: d
                          variableInitializer
                            expression
                              primary
                                literal
                                  integerLiteral: 1
                  blockStatement
                    statement: do while ;
                      statement
                        block: { }
                          blockStatement
                            statement: ;
                              expression: .
                                expression: .
                                  expression
                                    primary
                                      identifier: System
                                  identifier: out
                                methodCall
                                  identifier: print
                                  arguments
                                    null
                                      expressionList
                                        expression: +
                                          expression
                                            primary
                                              identifier: d
                                          expression
                                            primary
                                              literal: " "
                          blockStatement
                            statement: ;
                              expression: ++
                                expression
                                  primary
                                    identifier: d
                      null
                        expression: <=
                          expression
                            primary
                              identifier: d
                          expression
                            primary
                              literal
                                integerLiteral: 5
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: print
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    literal: "Enhanced For Loop : "
                                      numArray
                  blockStatement
                    statement: for
                      null
                        forControl
                          enhancedForControl: :
                            typeType
                              primitiveType: int
                            variableDeclaratorId
                              identifier: num
                            expression
                              primary
                                identifier: numArray
                      statement: ;
                        expression: .
                          expression: .
                            expression
                              primary
                                identifier: System
                            identifier: out
                          methodCall
                            identifier: print
                            arguments
                              null
                                expressionList
                                  expression: +
                                    expression
                                      primary
                                        identifier: num
                                    expression
                                      primary
                                        literal: " "
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        primitiveType: int
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: sum
                          variableInitializer
                            expression: +
                              expression
                                primary
                                  literal
                                    integerLiteral: 10
                              expression
                                primary
                                  literal
                                    integerLiteral: 20
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression: +
                                  expression
                                    primary
                                      literal: "\nSum of 10 + 20 = "
                                  expression
                                    primary
                                      identifier: sum
                  blockStatement: ;
                    localVariableDeclaration
                      typeType
                        classOrInterfaceType
                          classType
                            typeIdentifier: String
                      variableDeclarators
                        variableDeclarator: =
                          variableDeclaratorId
                            identifier: message
                          variableInitializer
                            expression
                              primary
                                literal: "This is a message inside main!"
                  blockStatement
                    statement: ;
                      expression: .
                        expression: .
                          expression
                            primary
                              identifier: System
                          identifier: out
                        methodCall
                          identifier: println
                          arguments
                            null
                              expressionList
                                expression
                                  primary
                                    identifier: message

`;



const lines = raw.split(/\r?\n/);

// --- Utility: compute indentation (count of leading spaces/tabs) ---
function indentSize(line) {
  let i = 0;
  while (i < line.length && (line[i] === ' ' || line[i] === '\t')) i++;
  // Count tab as 4 spaces for normalization
  const tabs = (line.slice(0, i).match(/\t/g) || []).length;
  const spaces = i - tabs;
  return tabs * 4 + spaces;
}

// --- Parse lines into node objects and build tree by indentation ---
function parseLines(lines) {
  const root = { type: 'ROOT', value: null, children: [] };
  // stack of {indent, node}
  const stack = [{ indent: -1, node: root }];

  for (let rawLine of lines) {
    // ignore empty lines
    if (!rawLine.trim()) continue;

    const indent = indentSize(rawLine);
    const trimmed = rawLine.trim();

    // Split "key: value" or "key"
    let type, value = null;
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex >= 0) {
      type = trimmed.slice(0, colonIndex).trim();
      value = trimmed.slice(colonIndex + 1).trim();
      // If value is exactly empty string after colon, set to null
      if (value === '') value = null;
    } else {
      type = trimmed;
    }

    const node = { type, value, children: [], meta: {} , rawLine: trimmed};

    // Find parent in stack (last with indent < current indent)
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].node;
    parent.children.push(node);

    // Push this node onto stack
    stack.push({ indent, node });
  }

  return root;
}

// --- Pretty JSON print for AST (can be large) ---
function astToJson(ast) {
  return JSON.stringify(ast, null, 2);
}

// --- Heuristic code generator for Java from the parsed AST ---
// This is intentionally simple and pattern-driven: it recognizes many of the
// node types in your AST and tries to produce a readable Java source file.
function generateJava(astRoot) {
  // Helper functions to find first child by type, or children by type.
  function first(node, type) {
    if (!node || !node.children) return null;
    return node.children.find(c => c.type === type) || null;
  }
  function all(node, type) {
    if (!node || !node.children) return [];
    return node.children.filter(c => c.type === type);
  }

  function nodeValue(node) {
    if (!node) return '';
    if (node.value !== undefined && node.value !== null) return String(node.value).trim();
    if (node.rawLine) {
      const idx = node.rawLine.indexOf(':');
      if (idx >= 0) return node.rawLine.slice(idx + 1).trim();
      return node.rawLine.trim();
    }
    return '';
  }

  function identifierName(node, fallback = 'var') {
    if (!node) return fallback;
    const ident = findInSubtree(node, 'identifier');
    return nodeValue(ident) || nodeValue(node) || fallback;
  }

  // Walk the tree to find classDeclaration node(s)
  const classes = [];
  (astRoot.children || []).forEach(child => {
    // There may be a compilationUnit -> typeDeclaration -> classDeclaration...
    if (child.type === 'compilationUnit') {
      // dig down
      const queue = child.children.slice();
      while (queue.length) {
        const n = queue.shift();
        if (n.type === 'classDeclaration') classes.push(n);
        if (n.children) queue.push(...n.children);
      }
    } else if (child.type === 'classDeclaration') {
      classes.push(child);
    }
  });

  // If none found, try entire tree
  if (classes.length === 0) {
    const queue = astRoot.children.slice();
    while (queue.length) {
      const n = queue.shift();
      if (n.type === 'classDeclaration') classes.push(n);
      if (n.children) queue.push(...n.children);
    }
  }

  // Render a single class (we'll use first found)
  if (classes.length === 0) return '// No classDeclaration found in AST';

  function renderClass(classNode) {
    // Find identifier child
    const idNode = first(classNode, 'identifier');
    const className = idNode ? idNode.value : 'UnknownClass';

    // Find classBody (children inside)
    const classBody = first(classNode, 'classBody') || { children: classNode.children || [] };

    const fields = [];
    const methods = [];
    // walk classBody children to collect fieldDeclaration and methodDeclaration, etc.
    (classBody.children || []).forEach(bodyChild => {
      // memberDeclaration -> fieldDeclaration | methodDeclaration | ...
      if (bodyChild.type === 'classBodyDeclaration' && bodyChild.children) {
        const md = bodyChild.children.find(c => c.type === 'memberDeclaration');
        const direct = bodyChild.children; // sometimes nested differently
        const allChildren = (md ? md.children : (bodyChild.children || []));

        // find fieldDeclaration
        const fieldDecl = allChildren.find(c => c.type === 'fieldDeclaration');
        const methodDecl = allChildren.find(c => c.type === 'methodDeclaration');
        if (fieldDecl) fields.push(fieldDecl);
        if (methodDecl) methods.push(methodDecl);
        // Also handle nested methodDeclaration directly
        if (!fieldDecl && !methodDecl) {
          // search deeper
          const deeperField = (bodyChild.children || []).find(n => n.type === 'fieldDeclaration');
          const deeperMethod = (bodyChild.children || []).find(n => n.type === 'methodDeclaration');
          if (deeperField) fields.push(deeperField);
          if (deeperMethod) methods.push(deeperMethod);
        }
      } else {
        // direct fieldDeclaration or methodDeclaration sometimes
        if (bodyChild.type === 'fieldDeclaration') fields.push(bodyChild);
        if (bodyChild.type === 'methodDeclaration') methods.push(bodyChild);
      }
    });

    const fieldStrs = fields.map(fd => renderField(fd)).filter(Boolean);
    const methodStrs = methods.map(md => renderMethod(md)).filter(Boolean);

    const parts = [];
    parts.push(`public class ${className} {`);
    parts.push('');
    // fields
    fieldStrs.forEach(s => {
      parts.push(indent(s, 4));
      parts.push('');
    });
    // methods
    methodStrs.forEach(m => {
      parts.push(indent(m, 4));
      parts.push('');
    });

    parts.push('}');
    return parts.join('\n');
  }

  // Helper: indent multi-line text
  function indent(text, n) {
    const pad = ' '.repeat(n);
    return text.split('\n').map(line => pad + line).join('\n');
  }

  function findInSubtree(node, targetType) {
    if (!node) return null;
    if (node.type === targetType) return node;
    for (const child of (node.children || [])) {
      const result = findInSubtree(child, targetType);
      if (result) return result;
    }
    return null;
  }

  // Render fieldDeclaration node to Java code (heuristic)
  function renderField(fdNode) {
    // fdNode typically has: typeType, variableDeclarators
    // typeType child might have primitiveType or classOrInterfaceType etc.
    const typeType = first(fdNode, 'typeType') || first(fdNode, 'typeType: [ ]') || first(fdNode, 'typeType: [ ] [ ]') || null;
    // But in your AST type is often nested; search for primitiveType or classOrInterfaceType in fdNode subtree
    function findType(n) {
      if (!n) return null;
      if (n.type === 'primitiveType') return n.value || (n.children[0] && n.children[0].value) || null;
      if (n.type === 'classOrInterfaceType' || n.type === 'classOrInterfaceType:') {
        const tid = n.children && n.children.find(c => c.type === 'classType' || c.type === 'typeIdentifier');
        if (tid) {
          const tid2 = tid.children && tid.children.find(c => c.type === 'typeIdentifier');
          if (tid2) return tid2.value || null;
        }
        // fallback to first typeIdentifier in subtree
        const q = findInSubtree(n, 'typeIdentifier');
        if (q) return q.value;
      }
      // arrays indicated with typeType: [ ] nodes; we will detect [] later
      // search recursively
      for (let c of (n.children || [])) {
        const r = findType(c);
        if (r) return r;
      }
      return null;
    }

    // reconstruct variableDeclarators -> variableDeclarator -> id and initializer
    const varDecs = all(fdNode, 'variableDeclarators').flatMap(vd => vd.children || []);
    // if varDecs empty, try variableDeclarator nodes directly
    const varDeclarators = (varDecs.length > 0) ? varDecs.filter(n => n.type === 'variableDeclarator' ) : all(fdNode, 'variableDeclarator');

    // find base type by scanning
    const baseType = findType(fdNode) || 'Object';

    // detect array dimensions by counting 'typeType: [ ]' occurrences or tokens in fdNode.rawLine
    // Simple heuristic: if node contains '[]' or earlier AST shows typeType: [ ] nodes, append []
    let dims = '';
    const subtreeText = JSON.stringify(fdNode).toLowerCase();
    const bracketCount = (subtreeText.match(/\[\s*\]/g) || []).length;
    for (let i = 0; i < bracketCount; i++) dims += '[]';

    // Render each declarator
    const fragments = [];
    for (let decl of varDeclarators) {
      // find identifier child
      const id = findInSubtree(decl, 'identifier') || findInSubtree(decl, 'variableDeclaratorId') || findInSubtree(decl, 'variableDeclarator');
      const idName = id ? (id.value || id.rawLine || 'var') : 'var';

      // find variableInitializer literal if present
      const initNode = findInSubtree(decl, 'variableInitializer') || findInSubtree(decl, 'arrayInitializer');
      let initStr = null;
      if (initNode) {
        initStr = renderExpression(initNode);
        if (!initStr) {
          const literalVals = collectLiterals(initNode);
          if (initNode.type === 'arrayInitializer' || /arrayinitializer/i.test(initNode.type)) {
            initStr = '{' + literalVals.join(', ') + '}';
          } else if (literalVals.length === 1) {
            initStr = literalVals[0];
          } else if (literalVals.length > 1) {
            initStr = literalVals.join(' ');
          }
        }
      }
      if (initStr !== null) fragments.push(`${baseType}${dims} ${idName} = ${initStr};`);
      else fragments.push(`${baseType}${dims} ${idName};`);
    }

    return fragments.join('\n');
  }

  // Collect literal tokens (numbers, strings, char, true/false) from subtree
  function collectLiterals(node) {
    const out = [];
    function walk(n) {
      if (!n) return;
      if (n.type && /literal/i.test(n.type) || /(integerLiteral|floatLiteral|char|literal|stringLiteral|true|false)/i.test(n.rawLine || '')) {
        const val = nodeValue(n);
        if (val) out.push(val);
      }
      // special-case identifier nodes that carry a value (e.g. "identifier: One" sometimes)
      if (n.type === 'integerLiteral' || n.type === 'floatLiteral' || n.type === 'literal' || n.type.toLowerCase().includes('literal')) {
        const val = nodeValue(n);
        if (val) out.push(val);
      }
      if (n.type === 'primary' && n.children) {
        // primary -> literal -> integerLiteral: 1
        for (let c of n.children) {
          if (c.type) {
            const val = nodeValue(c);
            if (val) out.push(val);
          }
        }
      }
      for (let c of (n.children || [])) walk(c);
    }
    walk(node);
    // Post-process: remove leading/trailing punctuation about braces from values if present
    return out.map(s => {
      // keep strings with quotes if they already have them in AST (they often do)
      if (typeof s === 'string' && s.length > 0) return s;
      return String(s);
    });
  }

  function renderExpression(node) {
    if (!node) return '';
    const type = node.type || '';

    if (type === 'expressionList') {
      return (node.children || []).map(renderExpression).filter(Boolean).join(', ');
    }

    if (/arrayInitializer/i.test(type)) {
      const elems = (node.children || []).map(renderExpression).filter(Boolean);
      return '{' + elems.join(', ') + '}';
    }

    if (type === 'variableInitializer') {
      if (node.children && node.children.length) {
        const rendered = renderExpression(node.children[0]);
        if (rendered) return rendered;
      }
    }

    if (/literal/i.test(type)) {
      return nodeValue(node);
    }

    if (type === 'identifier' || type === 'typeIdentifier') {
      return nodeValue(node);
    }

    if (type === 'variableDeclaratorId') {
      return identifierName(node);
    }

    if (type === 'primary') {
      if (node.children && node.children.length) {
        for (const child of node.children) {
          const rendered = renderExpression(child);
          if (rendered) return rendered;
        }
      }
      return nodeValue(node);
    }

    if (type === 'methodCall') {
      const methodNameNode = node.children && node.children.find(c => c.type === 'identifier');
      const methodName = nodeValue(methodNameNode) || 'method';
      const exprList = findInSubtree(node, 'expressionList');
      const args = [];
      if (exprList && exprList.children) {
        exprList.children.forEach(exprNode => {
          const rendered = renderExpression(exprNode);
          if (rendered) args.push(rendered);
        });
      }
      return `${methodName}(${args.join(', ')})`;
    }

    if (type === 'expression') {
      const op = nodeValue(node);
      const children = node.children || [];
      if (op === '+') {
        const parts = children.map(renderExpression).filter(Boolean);
        return parts.join(' + ');
      }
      if (['-', '*', '/', '%', '<', '>', '<=', '>=', '==', '!='].includes(op)) {
        const parts = children.map(renderExpression).filter(Boolean);
        if (parts.length >= 2) return `${parts[0]} ${op} ${parts[1]}`;
      }
      if (op === '++' || op === '--') {
        const target = children.map(renderExpression).filter(Boolean)[0];
        if (target) return `${target}${op}`;
      }
      if (op === '[ ]') {
        const target = renderExpression(children[0]);
        const index = renderExpression(children[1]);
        if (target && index) return `${target}[${index}]`;
      }
      if (op === '.') {
        const left = renderExpression(children[0]);
        const right = renderExpression(children[1]);
        if (left && right) return `${left}.${right}`;
      }
      if (!op && children.length === 1) {
        return renderExpression(children[0]);
      }
      const fallback = children.map(renderExpression).filter(Boolean);
      if (fallback.length) return fallback.join(' ');
      return op || '';
    }

    if (node.children && node.children.length) {
      const parts = node.children.map(renderExpression).filter(Boolean);
      if (parts.length) return parts.join(' ');
    }

    return nodeValue(node);
  }

  // Render methodDeclaration (heuristic)
  function renderMethod(mdNode) {
    // find return type (typeTypeOrVoid)
    const ttorv = first(mdNode, 'typeTypeOrVoid') || first(mdNode, 'typeTypeOrVoid: void') || first(mdNode, 'typeTypeOrVoid:');
    let returnType = 'void';
    if (ttorv) {
      // ttorv may contain a typeType child or 'void'
      if (ttorv.value && ttorv.value !== '') returnType = ttorv.value;
      else {
        // search subtree for primitiveType or typeType
        const prim = findInSubtree(mdNode, 'primitiveType') || findInSubtree(mdNode, 'typeType');
        if (prim && prim.children && prim.children.length === 1 && prim.children[0].value) {
          returnType = prim.children[0].value;
        } else if (prim && prim.value) {
          returnType = prim.value;
        } else if (mdNode.children) {
          const rv = mdNode.children.find(c => c.type === 'typeType' || c.type === 'primitiveType' || c.type === 'typeTypeOrVoid');
          if (rv && rv.value) returnType = rv.value;
        }
      }
    }

    // name
    const id = first(mdNode, 'identifier') || first(mdNode, 'methodDeclaration');
    const name = id ? (id.value || id.rawLine || 'method') : 'method';

    // parameters - look for formalParameters -> ( ... ) structure
    // We'll collect parameter names and types by searching for formalParameter nodes
    const formalParams = [];
    function collectParams(n) {
      if (!n) return;
      if (n.type === 'formalParameter') {
        // find typeType child and variableDeclaratorId -> identifier
        const pType = findInSubtree(n, 'primitiveType') || findInSubtree(n, 'typeType') || findInSubtree(n, 'classOrInterfaceType');
        let pTypeName = 'Object';
        if (pType) {
          // try to get a literal token under
          if (pType.value) pTypeName = pType.value;
          else {
            const tid = findInSubtree(pType, 'typeIdentifier') || findInSubtree(pType, 'primitiveType');
            if (tid && tid.value) pTypeName = tid.value;
            else if (pType.children && pType.children.length && pType.children[0].value) pTypeName = pType.children[0].value;
          }
        }
        const varId = findInSubtree(n, 'variableDeclaratorId') || findInSubtree(n, 'identifier');
        const paramName = identifierName(varId, 'p');
        formalParams.push(`${pTypeName} ${paramName}`);
      } else {
        (n.children || []).forEach(collectParams);
      }
    }
    collectParams(mdNode);

    // method body: try to reconstruct simple printlns, returns, calls
    const body = first(mdNode, 'methodBody') || first(mdNode, 'block') || null;
    const bodyLines = [];
    if (body) {
      // walk block statements and try to render
      function walkStmt(node) {
        if (!node) return;
        // print statements: pattern includes System -> out -> println or print
        if (node.type === 'methodCall' || node.rawLine && /println|print/.test(node.rawLine)) {
          const methodNameNode = node.children && node.children.find(c => c.type === 'identifier');
          const methodName = nodeValue(methodNameNode) || 'println';
          const exprList = findInSubtree(node, 'expressionList');
          const args = [];
          if (exprList && exprList.children) {
            exprList.children.forEach(exprNode => {
              const rendered = renderExpression(exprNode);
              if (rendered) args.push(rendered);
            });
          }
          bodyLines.push(`System.out.${methodName}(${args.join(', ')});`);
          return;
        }
        if (node.type === 'return') {
          const expr = node.children && node.children.find(c => c.type === 'expression');
          const rendered = renderExpression(expr);
          if (rendered) bodyLines.push(`return ${rendered};`);
          else bodyLines.push('return;');
          return;
        }
        // variable declarations
        if (node.type === 'localVariableDeclaration' || /localVariableDeclaration/i.test(node.type)) {
          // we might find primitiveType and variableDeclaratorId inside
          const t = findInSubtree(node, 'primitiveType') || findInSubtree(node, 'typeType');
          const tname = (t && (t.value || (t.children && t.children[0] && t.children[0].value))) || 'int';
          const vid = findInSubtree(node, 'variableDeclaratorId') || findInSubtree(node, 'identifier');
          const vname = identifierName(vid, 'v');
          const init = findInSubtree(node, 'variableInitializer');
          let initStr = init ? renderExpression(init) : null;
          if (!initStr && init) {
            const lits = collectLiterals(init);
            if (lits.length) initStr = lits[0];
          }
          if (initStr) bodyLines.push(`${tname} ${vname} = ${initStr};`);
          else bodyLines.push(`${tname} ${vname};`);
          return;
        }

        // If node has children, recurse
        (node.children || []).forEach(walkStmt);
      }

      (body.children || []).forEach(walkStmt);
    }

    // if no bodyLines, default to empty body or comment
    const methodLines = [];
    methodLines.push(`${returnType} ${name}(${formalParams.join(', ')}) {`);
    if (bodyLines.length) {
      bodyLines.forEach(l => methodLines.push('    ' + l));
    } else {
      methodLines.push('    // method body not reconstructed (no known patterns)');
    }
    methodLines.push('}');

    return methodLines.join('\n');
  }

  // Use the first class for now
  const java = renderClass(classes[0]);
  return java;
}

// --- Run parser and generator, print results ---
const parsed = parseLines(lines);

// Print JSON AST (trim if huge)
const json = astToJson(parsed);
console.log('=== Parsed AST (JSON) ===\n');
console.log(json);

// Separator
console.log('\n\n=== Reconstructed Java (heuristic) ===\n');
const javaCode = generateJava(parsed);
console.log(javaCode);

// Save outputs to disk
try {
  fs.writeFileSync('parsed_ast.json', json, 'utf8');
  fs.writeFileSync('reconstructed.java', javaCode, 'utf8');
  console.log('\nWrote parsed_ast.json and reconstructed.java to current directory.');
} catch (e) {
  console.warn('Could not write output files:', e.message);
}
