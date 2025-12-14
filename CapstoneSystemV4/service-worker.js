const CACHE_NAME = 'code-tropa-offline-cache-main';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './service-worker.js',
  './service-worker-storymode-1j.js',
  './service-worker-storymode-2cP.js',
  './service-worker-storymode-3cS.js',
  
  // Monaco Editor core files
  '../node_modules/monaco-editor/min/vs/loader.js',
  '../node_modules/monaco-editor/min/vs/editor/editor.main.js',
  '../node_modules/monaco-editor/min/vs/editor/editor.main.css',
  '../node_modules/monaco-editor/min/vs/editor.api-i0YVFWkl.js',
  '../node_modules/monaco-editor/min/vs/assets/editor.worker-DM0G1eFj.js',
  '../node_modules/monaco-editor/min/vs/java-CI4ZMsH9.js',
  '../node_modules/monaco-editor/min/vs/cpp-CkKPQIni.js',
  '../node_modules/monaco-editor/min/vs/csharp-CX28MZyh.js',
  '../node_modules/monaco-editor/min/vs/basic-languages/monaco.contribution.js',
  '../node_modules/monaco-editor/min/vs/nls.messages-loader.js',
  '../node_modules/monaco-editor/min/vs/cssMode-CGp6dFmI.js',
  '../node_modules/monaco-editor/min/vs/htmlMode-DtjCNH-N.js',
  '../node_modules/monaco-editor/min/vs/jsonMode-CJjR_ECa.js',
  '../node_modules/monaco-editor/min/vs/tsMode-i88JHxDY.js',
  '../node_modules/monaco-editor/min/vs/language/css/monaco.contribution.js',
  '../node_modules/monaco-editor/min/vs/language/html/monaco.contribution.js',
  '../node_modules/monaco-editor/min/vs/language/json/monaco.contribution.js',
  '../node_modules/monaco-editor/min/vs/language/typescript/monaco.contribution.js',
  '../node_modules/monaco-editor/min/vs/workers-CbP2cVmy.js',
  '../node_modules/monaco-editor/min/vs/_commonjsHelpers-CT9FvmAN.js',


  // 1fe/asmt files
  './1fe/asmt/index.html',
  './1fe/asmt/pretest.html',
  './1fe/asmt/posttest.html',
  './1fe/asmt/questions.js',
  './1fe/asmt/result.html',

  // 1fe/assets
  './1fe/assets/arrow-l-b.png',
  './1fe/assets/arrow-l.png',
  './1fe/assets/arrow-r-b.png',
  './1fe/assets/arrow-r.png',
  './1fe/assets/b1.png',
  './1fe/assets/b2.png',
  './1fe/assets/b3.png',
  './1fe/assets/b4.png',
  './1fe/assets/b5.png',
  './1fe/assets/b6.png',
  './1fe/assets/b7.png',
  './1fe/assets/b8.png',
  './1fe/assets/b9.png',
  './1fe/assets/b10.png',
  './1fe/assets/b11.png',
  './1fe/assets/b12.png',
  './1fe/assets/b13.png',
  './1fe/assets/bg.mp4',
  './1fe/assets/bg.png',
  './1fe/assets/bgMusic.mp3',
  './1fe/assets/capstone-logo.png',
  './1fe/assets/favicon.ico',
  './1fe/assets/favicon.png',
  './1fe/assets/poly-button-black.png',
  './1fe/assets/poly-button-brown.png',
  './1fe/assets/poly1.png',
  './1fe/assets/poly2.png',
  './1fe/assets/rec-modal.png',
  './1fe/assets/sample.mp4',
  './1fe/assets/samplebg.jpg',
  './1fe/assets/translate.png',

  // 1fe/globalStyles
  './1fe/globalStyles/body.css',
  './1fe/globalStyles/log-n-sign.css',
  './1fe/globalStyles/poly1-div.css',

  // 1fe/login
  './1fe/login/index.html',

  // 1fe/signup
  './1fe/signup/index.html',

  // 1fe/homepage (root files only)
  './1fe/homepage/entry.html',
  './1fe/homepage/index.html',
  './1fe/homepage/newtab.html',
  './1fe/homepage/preload.html',

  // 1fe/homepage/styles
  './1fe/homepage/styles/desktop.css',
  './1fe/homepage/styles/mobileFirst.css',
  './1fe/homepage/styles/styles.css',

  // 1fe/homepage/scripts (root files only)
  './1fe/homepage/scripts/entryScript.js',
  './1fe/homepage/scripts/fetchProfileData.js',
  './1fe/homepage/scripts/loadBadges.js',
  './1fe/homepage/scripts/loadLeaderboard.js',
  './1fe/homepage/scripts/lockLevels.js',
  './1fe/homepage/scripts/lockStoryMode.js',
  './1fe/homepage/scripts/logout.js',
  './1fe/homepage/scripts/progressBar.js',
  './1fe/homepage/scripts/registerSW.js',
  './1fe/homepage/scripts/routeModules.js',
  './1fe/homepage/scripts/script.js',
  './1fe/homepage/scripts/serverAuth.js',
  './1fe/homepage/scripts/testCache.js',
  './1fe/homepage/scripts/videoPreloadManager.js',
  './1fe/homepage/scripts/dbManager.js',
  './1fe/homepage/scripts/apiClient.js',
  './1fe/homepage/scripts/syncManager.js',
  './1fe/homepage/scripts/fetchWrapper.js',
  './1fe/homepage/scripts/offlineIndicator.js',
  './1fe/homepage/scripts/pwa-install.js',

  // 1fe/homepage/scripts/2
  './1fe/homepage/scripts/2/backgroundMusicVolume.js',
  './1fe/homepage/scripts/2/difActions.js',
  './1fe/homepage/scripts/2/domContentLoaded.js',
  './1fe/homepage/scripts/2/hideModal.js',
  './1fe/homepage/scripts/2/modalHandler.js',
  './1fe/homepage/scripts/2/process.js',
  './1fe/homepage/scripts/2/process1.js',
  './1fe/homepage/scripts/2/process2.js',
  './1fe/homepage/scripts/2/process3.js',
  './1fe/homepage/scripts/2/processDifficulty.js',
  './1fe/homepage/scripts/2/submitLanguageSelection.js',

  // 1fe/homepage/1sm (root files only)
  './1fe/homepage/1sm/index.html',
  './1fe/homepage/1sm/integrateSaveGame.js',
  './1fe/homepage/1sm/pause.css',
  './1fe/homepage/1sm/pause.html',
  './1fe/homepage/1sm/saveGameHandler.js',
  './1fe/homepage/1sm/styles.css',
  './1fe/homepage/1sm/tips.js',

  // 1fe/homepage/1sm/1j (root files)
  './1fe/homepage/1sm/1j/tips.js',

  

  // 1fe/homepage/2ch (root files only)
  './1fe/homepage/2ch/challengeData.js',
  './1fe/homepage/2ch/codeAnalyzer.js',
  './1fe/homepage/2ch/codeSimulation.js',
  './1fe/homepage/2ch/index.html',
  './1fe/homepage/2ch/mobileControls.js',
  './1fe/homepage/2ch/modalManager.js',
  './1fe/homepage/2ch/monaco-editor.html',
  './1fe/homepage/2ch/pause.html',
  './1fe/homepage/2ch/rubrics.js',
  './1fe/homepage/2ch/styles.css',
  './1fe/homepage/2ch/tips.js',

  // 1fe/homepage/2ch/assets
  './1fe/homepage/2ch/assets/1/AVERAGE.png',
  './1fe/homepage/2ch/assets/1/DIFFICULT.png',
  './1fe/homepage/2ch/assets/1/EASY.png',
  './1fe/homepage/2ch/assets/2/AVERAGE.png',
  './1fe/homepage/2ch/assets/2/DIFFICULT.png',
  './1fe/homepage/2ch/assets/2/EASY.png',
  './1fe/homepage/2ch/assets/3/AVERAGE.png',
  './1fe/homepage/2ch/assets/3/DIFFICULT.png',
  './1fe/homepage/2ch/assets/3/EASY.png',
  './1fe/homepage/2ch/assets/4/AVERAGE.png',
  './1fe/homepage/2ch/assets/4/DIFFICULT.png',
  './1fe/homepage/2ch/assets/4/EASY.png',
  './1fe/homepage/2ch/assets/5/AVERAGE.png',
  './1fe/homepage/2ch/assets/5/DIFFICULT.png',
  './1fe/homepage/2ch/assets/5/EASY.png',
  './1fe/homepage/2ch/assets/6/AVERAGE.png',
  './1fe/homepage/2ch/assets/6/DIFFICULT.png',
  './1fe/homepage/2ch/assets/6/EASY.png',
  './1fe/homepage/2ch/assets/7/AVERAGE.png',
  './1fe/homepage/2ch/assets/7/DIFFICULT.png',
  './1fe/homepage/2ch/assets/7/EASY.png',
  './1fe/homepage/2ch/assets/8/AVERAGE.png',
  './1fe/homepage/2ch/assets/8/DIFFICULT.png',
  './1fe/homepage/2ch/assets/8/EASY.png',
  './1fe/homepage/2ch/assets/9/AVERAGE.png',
  './1fe/homepage/2ch/assets/9/DIFFICULT.png',
  './1fe/homepage/2ch/assets/9/EASY.png',
  './1fe/homepage/2ch/assets/10/AVERAGE.png',
  './1fe/homepage/2ch/assets/10/DIFFICULT.png',
  './1fe/homepage/2ch/assets/10/EASY.png',
  './1fe/homepage/2ch/assets/11/AVERAGE.png',
  './1fe/homepage/2ch/assets/11/DIFFICULT.png',
  './1fe/homepage/2ch/assets/11/EASY.png',
  './1fe/homepage/2ch/assets/12/AVERAGE.png',
  './1fe/homepage/2ch/assets/12/DIFFICULT.png',
  './1fe/homepage/2ch/assets/12/EASY.png',
  './1fe/homepage/2ch/assets/13/AVERAGE.png',
  './1fe/homepage/2ch/assets/13/DIFFICULT.png',
  './1fe/homepage/2ch/assets/13/EASY.png',
  './1fe/homepage/2ch/assets/14/AVERAGE.png',
  './1fe/homepage/2ch/assets/14/DIFFICULT.png',
  './1fe/homepage/2ch/assets/14/EASY.png',
  './1fe/homepage/2ch/assets/15/AVERAGE.png',
  './1fe/homepage/2ch/assets/15/DIFFICULT.png',
  './1fe/homepage/2ch/assets/15/EASY.png',
  './1fe/homepage/2ch/assets/16/AVERAGE.png',
  './1fe/homepage/2ch/assets/16/DIFFICULT.png',
  './1fe/homepage/2ch/assets/16/EASY.png',
  './1fe/homepage/2ch/assets/17/AVERAGE.png',
  './1fe/homepage/2ch/assets/17/DIFFICULT.png',
  './1fe/homepage/2ch/assets/17/EASY.png',
  './1fe/homepage/2ch/assets/18/AVERAGE.png',
  './1fe/homepage/2ch/assets/18/DIFFICULT.png',
  './1fe/homepage/2ch/assets/18/EASY.png',
  './1fe/homepage/2ch/assets/19/AVERAGE.png',
  './1fe/homepage/2ch/assets/19/DIFFICULT.png',
  './1fe/homepage/2ch/assets/19/EASY.png',
  './1fe/homepage/2ch/assets/20/AVERAGE.png',
  './1fe/homepage/2ch/assets/20/DIFFICULT.png',
  './1fe/homepage/2ch/assets/20/EASY.png',

  // 1fe/homepage/2ch/compiler
  './1fe/homepage/2ch/compiler/cppCompiler.js',
  './1fe/homepage/2ch/compiler/cppCompiler2.js',
  './1fe/homepage/2ch/compiler/csharpCompiler.js',
  './1fe/homepage/2ch/compiler/csharpCompiler2.js',
  './1fe/homepage/2ch/compiler/javaCompiler.js',
  './1fe/homepage/2ch/compiler/javaCompiler2.js',

  // 1fe/homepage/2ch/1j (root files)
  './1fe/homepage/2ch/1j/tips.js',

  // 1fe/homepage/2ch/1j/analysis_grammars
  './1fe/homepage/2ch/1j/analysis_grammars/grammarLoader.js',
  './1fe/homepage/2ch/1j/analysis_grammars/main.js',
  './1fe/homepage/2ch/1j/analysis_grammars/parseJava.js',
  './1fe/homepage/2ch/1j/analysis_grammars/antlr/antlr4.web.js',
  './1fe/homepage/2ch/1j/analysis_grammars/antlr/JavaLexer.js',
  './1fe/homepage/2ch/1j/analysis_grammars/antlr/JavaParser.js',
  './1fe/homepage/2ch/1j/analysis_grammars/antlr/JavaParserListener.js',
  './1fe/homepage/2ch/1j/analysis_grammars/antlr/JavaParserVisitor.js',

  // 1fe/homepage/2ch/1j/lvl1
  './1fe/homepage/2ch/1j/lvl1/objectives.js',
  './1fe/homepage/2ch/1j/lvl1/solutions.js',

  // 1fe/homepage/2ch/1j/lvl2
  './1fe/homepage/2ch/1j/lvl2/objectives.js',
  './1fe/homepage/2ch/1j/lvl2/solutions.js',

  // 1fe/homepage/2ch/1j/lvl3
  './1fe/homepage/2ch/1j/lvl3/objectives.js',
  './1fe/homepage/2ch/1j/lvl3/solutions.js',

  // 1fe/homepage/2ch/1j/lvl4
  './1fe/homepage/2ch/1j/lvl4/objectives.js',
  './1fe/homepage/2ch/1j/lvl4/solutions.js',

  // 1fe/homepage/2ch/1j/lvl5
  './1fe/homepage/2ch/1j/lvl5/objectives.js',
  './1fe/homepage/2ch/1j/lvl5/solutions.js',

  // 1fe/homepage/2ch/1j/lvl6
  './1fe/homepage/2ch/1j/lvl6/objectives.js',
  './1fe/homepage/2ch/1j/lvl6/solutions.js',

  // 1fe/homepage/2ch/1j/lvl7
  './1fe/homepage/2ch/1j/lvl7/objectives.js',
  './1fe/homepage/2ch/1j/lvl7/solutions.js',

  // 1fe/homepage/2ch/1j/lvl8
  './1fe/homepage/2ch/1j/lvl8/objectives.js',
  './1fe/homepage/2ch/1j/lvl8/solutions.js',

  // 1fe/homepage/2ch/1j/lvl9
  './1fe/homepage/2ch/1j/lvl9/objectives.js',
  './1fe/homepage/2ch/1j/lvl9/solutions.js',

  // 1fe/homepage/2ch/1j/lvl10
  './1fe/homepage/2ch/1j/lvl10/objectives.js',
  './1fe/homepage/2ch/1j/lvl10/solutions.js',

  // 1fe/homepage/2ch/1j/lvl11
  './1fe/homepage/2ch/1j/lvl11/objectives.js',
  './1fe/homepage/2ch/1j/lvl11/solutions.js',

  // 1fe/homepage/2ch/1j/lvl12
  './1fe/homepage/2ch/1j/lvl12/objectives.js',
  './1fe/homepage/2ch/1j/lvl12/solutions.js',

  // 1fe/homepage/2ch/1j/lvl13
  './1fe/homepage/2ch/1j/lvl13/objectives.js',
  './1fe/homepage/2ch/1j/lvl13/solutions.js',

  // 1fe/homepage/2ch/1j/lvl14
  './1fe/homepage/2ch/1j/lvl14/objectives.js',
  './1fe/homepage/2ch/1j/lvl14/solutions.js',

  // 1fe/homepage/2ch/1j/lvl15
  './1fe/homepage/2ch/1j/lvl15/objectives.js',
  './1fe/homepage/2ch/1j/lvl15/solutions.js',

  // 1fe/homepage/2ch/1j/lvl16
  './1fe/homepage/2ch/1j/lvl16/objectives.js',
  './1fe/homepage/2ch/1j/lvl16/solutions.js',

  // 1fe/homepage/2ch/1j/lvl17
  './1fe/homepage/2ch/1j/lvl17/objectives.js',
  './1fe/homepage/2ch/1j/lvl17/solutions.js',

  // 1fe/homepage/2ch/1j/lvl18
  './1fe/homepage/2ch/1j/lvl18/objectives.js',
  './1fe/homepage/2ch/1j/lvl18/solutions.js',

  // 1fe/homepage/2ch/1j/lvl19
  './1fe/homepage/2ch/1j/lvl19/objectives.js',
  './1fe/homepage/2ch/1j/lvl19/solutions.js',

  // 1fe/homepage/2ch/1j/lvl20
  './1fe/homepage/2ch/1j/lvl20/objectives.js',
  './1fe/homepage/2ch/1j/lvl20/solutions.js',

  // 1fe/homepage/2ch/2cP (root files)
  './1fe/homepage/2ch/2cP/tips.js',

  // 1fe/homepage/2ch/2cP/analysis_grammars
  './1fe/homepage/2ch/2cP/analysis_grammars/grammarLoader.js',
  './1fe/homepage/2ch/2cP/analysis_grammars/antlr/antlr4.web.js',
  './1fe/homepage/2ch/2cP/analysis_grammars/antlr/CPP14Lexer.js',
  './1fe/homepage/2ch/2cP/analysis_grammars/antlr/CPP14Parser.js',
  './1fe/homepage/2ch/2cP/analysis_grammars/antlr/CPP14ParserListener.js',
  './1fe/homepage/2ch/2cP/analysis_grammars/antlr/CPP14ParserVisitor.js',

  // 1fe/homepage/2ch/2cP/lvl1
  './1fe/homepage/2ch/2cP/lvl1/objectives.js',
  './1fe/homepage/2ch/2cP/lvl1/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl2
  './1fe/homepage/2ch/2cP/lvl2/objectives.js',
  './1fe/homepage/2ch/2cP/lvl2/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl3
  './1fe/homepage/2ch/2cP/lvl3/objectives.js',
  './1fe/homepage/2ch/2cP/lvl3/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl4
  './1fe/homepage/2ch/2cP/lvl4/objectives.js',
  './1fe/homepage/2ch/2cP/lvl4/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl5
  './1fe/homepage/2ch/2cP/lvl5/objectives.js',
  './1fe/homepage/2ch/2cP/lvl5/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl6
  './1fe/homepage/2ch/2cP/lvl6/objectives.js',
  './1fe/homepage/2ch/2cP/lvl6/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl7
  './1fe/homepage/2ch/2cP/lvl7/objectives.js',
  './1fe/homepage/2ch/2cP/lvl7/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl8
  './1fe/homepage/2ch/2cP/lvl8/objectives.js',
  './1fe/homepage/2ch/2cP/lvl8/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl9
  './1fe/homepage/2ch/2cP/lvl9/objectives.js',
  './1fe/homepage/2ch/2cP/lvl9/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl10
  './1fe/homepage/2ch/2cP/lvl10/objectives.js',
  './1fe/homepage/2ch/2cP/lvl10/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl11
  './1fe/homepage/2ch/2cP/lvl11/objectives.js',
  './1fe/homepage/2ch/2cP/lvl11/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl12
  './1fe/homepage/2ch/2cP/lvl12/objectives.js',
  './1fe/homepage/2ch/2cP/lvl12/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl13
  './1fe/homepage/2ch/2cP/lvl13/objectives.js',
  './1fe/homepage/2ch/2cP/lvl13/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl14
  './1fe/homepage/2ch/2cP/lvl14/objectives.js',
  './1fe/homepage/2ch/2cP/lvl14/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl15
  './1fe/homepage/2ch/2cP/lvl15/objectives.js',
  './1fe/homepage/2ch/2cP/lvl15/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl16
  './1fe/homepage/2ch/2cP/lvl16/objectives.js',
  './1fe/homepage/2ch/2cP/lvl16/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl17
  './1fe/homepage/2ch/2cP/lvl17/objectives.js',
  './1fe/homepage/2ch/2cP/lvl17/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl18
  './1fe/homepage/2ch/2cP/lvl18/objectives.js',
  './1fe/homepage/2ch/2cP/lvl18/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl19
  './1fe/homepage/2ch/2cP/lvl19/objectives.js',
  './1fe/homepage/2ch/2cP/lvl19/solutions.js',

  // 1fe/homepage/2ch/2cP/lvl20
  './1fe/homepage/2ch/2cP/lvl20/objectives.js',
  './1fe/homepage/2ch/2cP/lvl20/solutions.js',

  // 1fe/homepage/2ch/3cS (root files)
  './1fe/homepage/2ch/3cS/tips.js',

  // 1fe/homepage/2ch/3cS/analysis_grammars
  './1fe/homepage/2ch/3cS/analysis_grammars/grammarLoader.js',
  './1fe/homepage/2ch/3cS/analysis_grammars/antlr/antlr4.web.js',
  './1fe/homepage/2ch/3cS/analysis_grammars/antlr/CSharpLexer.js',
  './1fe/homepage/2ch/3cS/analysis_grammars/antlr/CSharpParser.js',
  './1fe/homepage/2ch/3cS/analysis_grammars/antlr/CSharpParserListener.js',
  './1fe/homepage/2ch/3cS/analysis_grammars/antlr/CSharpParserVisitor.js',

  // 1fe/homepage/2ch/3cS/lvl1
  './1fe/homepage/2ch/3cS/lvl1/objectives.js',
  './1fe/homepage/2ch/3cS/lvl1/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl2
  './1fe/homepage/2ch/3cS/lvl2/objectives.js',
  './1fe/homepage/2ch/3cS/lvl2/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl3
  './1fe/homepage/2ch/3cS/lvl3/objectives.js',
  './1fe/homepage/2ch/3cS/lvl3/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl4
  './1fe/homepage/2ch/3cS/lvl4/objectives.js',
  './1fe/homepage/2ch/3cS/lvl4/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl5
  './1fe/homepage/2ch/3cS/lvl5/objectives.js',
  './1fe/homepage/2ch/3cS/lvl5/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl6
  './1fe/homepage/2ch/3cS/lvl6/objectives.js',
  './1fe/homepage/2ch/3cS/lvl6/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl7
  './1fe/homepage/2ch/3cS/lvl7/objectives.js',
  './1fe/homepage/2ch/3cS/lvl7/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl8
  './1fe/homepage/2ch/3cS/lvl8/objectives.js',
  './1fe/homepage/2ch/3cS/lvl8/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl9
  './1fe/homepage/2ch/3cS/lvl9/objectives.js',
  './1fe/homepage/2ch/3cS/lvl9/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl10
  './1fe/homepage/2ch/3cS/lvl10/objectives.js',
  './1fe/homepage/2ch/3cS/lvl10/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl11
  './1fe/homepage/2ch/3cS/lvl11/objectives.js',
  './1fe/homepage/2ch/3cS/lvl11/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl12
  './1fe/homepage/2ch/3cS/lvl12/objectives.js',
  './1fe/homepage/2ch/3cS/lvl12/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl13
  './1fe/homepage/2ch/3cS/lvl13/objectives.js',
  './1fe/homepage/2ch/3cS/lvl13/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl14
  './1fe/homepage/2ch/3cS/lvl14/objectives.js',
  './1fe/homepage/2ch/3cS/lvl14/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl15
  './1fe/homepage/2ch/3cS/lvl15/objectives.js',
  './1fe/homepage/2ch/3cS/lvl15/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl16
  './1fe/homepage/2ch/3cS/lvl16/objectives.js',
  './1fe/homepage/2ch/3cS/lvl16/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl17
  './1fe/homepage/2ch/3cS/lvl17/objectives.js',
  './1fe/homepage/2ch/3cS/lvl17/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl18
  './1fe/homepage/2ch/3cS/lvl18/objectives.js',
  './1fe/homepage/2ch/3cS/lvl18/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl19
  './1fe/homepage/2ch/3cS/lvl19/objectives.js',
  './1fe/homepage/2ch/3cS/lvl19/solutions.js',

  // 1fe/homepage/2ch/3cS/lvl20
  './1fe/homepage/2ch/3cS/lvl20/objectives.js',
  './1fe/homepage/2ch/3cS/lvl20/solutions.js'
];

// Helper function to notify clients about caching progress
async function notifyClients(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach(client => client.postMessage(message));
}

// Install Service Worker and cache files with progress reporting
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache: main');
      
      const total = FILES_TO_CACHE.length;
      let current = 0;
      
      // Cache files one by one and report progress
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          current++;
          await notifyClients({
            type: 'CACHE_PROGRESS',
            worker: 'main',
            file: file,
            current: current,
            total: total
          });
        } catch (error) {
          console.warn(`Failed to cache: ${file}`, error);
          current++;
        }
      }
      
      await notifyClients({
        type: 'CACHE_COMPLETE',
        worker: 'main',
        total: total
      });
      
      console.log('Main cache complete');
    })()
  );
  self.skipWaiting();
});

// Background Sync event handler
self.addEventListener('sync', event => {
  if (event.tag === 'sync-queue') {
    event.waitUntil(
      // Notify clients to trigger sync
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SYNC_QUEUE' });
        });
        return Promise.resolve();
      })
    );
  }
});

// Message handler for sync requests
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SYNC_REQUEST') {
    // Forward sync request to clients
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'SYNC_QUEUE' });
      });
    });
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch cached files if available
// Check if request is an API call
function isAPIRequest(url) {
  return url.includes('/2be/') && url.endsWith('.php');
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Handle API requests differently
  if (isAPIRequest(url.pathname)) {
    // For API requests, try network first, don't cache in service worker
    // The apiClient.js will handle caching in IndexedDB
    event.respondWith(
      fetch(request)
        .catch(error => {
          console.log('API request failed (offline):', url.pathname);
          // Return error response - apiClient will handle offline logic
          return new Response(JSON.stringify({
            success: false,
            message: 'Network error - request will be queued for sync',
            offline: true
          }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  // For static assets, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(error => {
        console.error('Fetch failed:', error);
        // Return a basic error response instead of undefined
        return new Response('Network error happened', {
          status: 408,
          statusText: 'Request Timeout',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
