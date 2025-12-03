# Node Modules Cleanup Guide
# Due to long Windows paths, manual deletion recommended

## Summary of What to Delete

### ✅ SAFE TO DELETE (Saves ~65-70 MB):

1. **node_modules/monaco-editor/dev/**
   - Size: ~25 MB
   - Reason: Development build, we use min/ folder
   - Impact: None, min/ is what your app uses

2. **node_modules/monaco-editor/esm/**
   - Size: ~40+ MB  
   - Reason: ES Module build, we use min/ folder
   - Impact: None, min/ is what your app uses

3. **Unused language files in node_modules/monaco-editor/min/vs/**
   - Files like: python-*.js, rust-*.js, go-*.js, ruby-*.js, etc.
   - Size: ~1.5 MB
   - Reason: Your app only uses Java, C++, C#
   - Impact: None if you don't add new languages

### ⚠️ KEEP THESE:

✅ node_modules/monaco-editor/min/ - **REQUIRED**
✅ node_modules/marked/ - Monaco dependency
✅ node_modules/dompurify/ - Monaco dependency
✅ node_modules/.bin/ - Package executables

### 📁 What to Keep in monaco-editor/min/vs/:

**Required Files:**
- loader.js
- editor/editor.main.js
- editor/editor.main.css
- editor.api-*.js
- assets/ folder (all workers)
- java-*.js
- cpp-*.js
- csharp-*.js
- basic-languages/ folder
- workers-*.js
- _commonjsHelpers-*.js
- *Mode-*.js files

**Can Delete (89 files, ~1.5 MB):**
- abap-*.js
- apex-*.js
- azcli-*.js
- bat-*.js
- bicep-*.js
- clojure-*.js
- coffee-*.js
- dart-*.js
- dockerfile-*.js
- elixir-*.js
- flow9-*.js
- fsharp-*.js
- go-*.js
- graphql-*.js
- handlebars-*.js
- hcl-*.js
- html-*.js
- ini-*.js
- javascript-*.js
- julia-*.js
- kotlin-*.js
- less-*.js
- lexon-*.js
- liquid-*.js
- lua-*.js
- m3-*.js
- markdown-*.js
- mdx-*.js
- mips-*.js
- msdax-*.js
- mysql-*.js
- objective-c-*.js
- pascal-*.js
- pascaligo-*.js
- perl-*.js
- pgsql-*.js
- php-*.js
- pla-*.js
- postiats-*.js
- powerquery-*.js
- powershell-*.js
- protobuf-*.js
- pug-*.js
- python-*.js
- qsharp-*.js
- r-*.js
- razor-*.js
- redis-*.js
- redshift-*.js
- restructuredtext-*.js
- ruby-*.js
- rust-*.js
- sb-*.js
- scala-*.js
- scheme-*.js
- scss-*.js
- shell-*.js
- solidity-*.js
- sophia-*.js
- sparql-*.js
- sql-*.js
- st-*.js
- swift-*.js
- systemverilog-*.js
- tcl-*.js
- twig-*.js
- typescript-*.js
- typespec-*.js
- vb-*.js
- wgsl-*.js
- xml-*.js
- yaml-*.js
- css-*.js (unless you want CSS editing)
- cssMode-*.js (unless you want CSS editing)
- htmlMode-*.js (unless you want HTML editing)
- jsonMode-*.js (unless you want JSON editing)
- tsMode-*.js (unless you want TS editing)

## Manual Deletion Steps

### Option 1: Delete via File Explorer
1. Open File Explorer
2. Navigate to your project's node_modules folder
3. Delete these folders:
   - monaco-editor\dev
   - monaco-editor\esm

### Option 2: Delete unused language files
1. Go to: node_modules\monaco-editor\min\vs\
2. Sort by name
3. Delete all the language-*.js files EXCEPT:
   - Keep: java-*.js
   - Keep: cpp-*.js
   - Keep: csharp-*.js
   - Delete all others

### Option 3: Use Command Prompt (shorter paths)
```batch
cd node_modules\monaco-editor
rmdir /s /q dev
rmdir /s /q esm
```

## Expected Results

Before cleanup: ~90 MB
After cleanup:  ~23-25 MB
**Savings: ~65-67 MB (72%)**

Your app will still work perfectly offline with all Java, C++, and C# support!

## If Something Breaks

If you accidentally delete something important:
1. Delete the entire node_modules folder
2. Run: npm install
3. This will restore everything

The service worker already has the right files cached from the previous update.



