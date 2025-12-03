# PowerShell Script to Identify Essential Monaco Editor Files
# Run this to see exactly what files Monaco uses in your setup

Write-Host "`n=== Monaco Editor File Analysis ===" -ForegroundColor Cyan
Write-Host "Analyzing node_modules/monaco-editor/min/vs/`n" -ForegroundColor Yellow

$monacoPath = "node_modules/monaco-editor/min/vs"

# Core files
Write-Host "1. CORE FILES (Required):" -ForegroundColor Green
$coreFiles = @(
    "loader.js",
    "editor/editor.main.js",
    "editor/editor.main.css"
)

$coreSize = 0
foreach ($file in $coreFiles) {
    $fullPath = Join-Path $monacoPath $file
    if (Test-Path $fullPath) {
        $size = (Get-Item $fullPath).Length
        $coreSize += $size
        $sizeMB = [math]::Round($size / 1MB, 2)
        Write-Host "   [OK] $file ($sizeMB MB)" -ForegroundColor White
    } else {
        Write-Host "   [MISSING] $file (NOT FOUND)" -ForegroundColor Red
    }
}
Write-Host "   Core Total: $([math]::Round($coreSize / 1MB, 2)) MB`n" -ForegroundColor Cyan

# Editor API files
Write-Host "2. EDITOR API FILES (Required):" -ForegroundColor Green
$apiFiles = Get-ChildItem -Path $monacoPath -Filter "editor.api-*.js" -File
$apiSize = 0
foreach ($file in $apiFiles) {
    $size = $file.Length
    $apiSize += $size
    $sizeMB = [math]::Round($size / 1MB, 2)
    Write-Host "   [OK] $($file.Name) ($sizeMB MB)" -ForegroundColor White
}
Write-Host "   API Total: $([math]::Round($apiSize / 1MB, 2)) MB`n" -ForegroundColor Cyan

# Worker files
Write-Host "3. WORKER FILES (Required for background processing):" -ForegroundColor Green
$workerPath = Join-Path $monacoPath "assets"
$workerFiles = Get-ChildItem -Path $workerPath -Filter "*.js" -File
$workerSize = 0
foreach ($file in $workerFiles) {
    $size = $file.Length
    $workerSize += $size
    $sizeMB = [math]::Round($size / 1MB, 2)
    $required = if ($file.Name -like "editor.worker-*") { " (REQUIRED)" } else { " (optional)" }
    Write-Host "   [OK] $($file.Name) ($sizeMB MB)$required" -ForegroundColor White
}
Write-Host "   Workers Total: $([math]::Round($workerSize / 1MB, 2)) MB`n" -ForegroundColor Cyan

# Language files for Java, C++, C#
Write-Host "4. LANGUAGE FILES (For your app: Java, C++, C#):" -ForegroundColor Green
$languagePatterns = @("java-*.js", "cpp-*.js", "csharp-*.js")
$langSize = 0
foreach ($pattern in $languagePatterns) {
    $langFiles = Get-ChildItem -Path $monacoPath -Filter $pattern -File
    foreach ($file in $langFiles) {
        $size = $file.Length
        $langSize += $size
        $sizeKB = [math]::Round($size / 1KB, 2)
        Write-Host "   [OK] $($file.Name) ($sizeKB KB)" -ForegroundColor White
    }
}

# Basic languages
$basicLangPath = Join-Path $monacoPath "basic-languages"
if (Test-Path $basicLangPath) {
    $basicFile = Get-ChildItem -Path $basicLangPath -Filter "monaco.contribution.js" -File
    if ($basicFile) {
        $size = $basicFile.Length
        $langSize += $size
        $sizeKB = [math]::Round($size / 1KB, 2)
        Write-Host "   [OK] basic-languages/monaco.contribution.js ($sizeKB KB)" -ForegroundColor White
    }
}
Write-Host "   Languages Total: $([math]::Round($langSize / 1KB, 2)) KB`n" -ForegroundColor Cyan

# Summary
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
$totalSize = $coreSize + $apiSize + $workerSize + $langSize
Write-Host "Core Files:      $([math]::Round($coreSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "API Files:       $([math]::Round($apiSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "Workers:         $([math]::Round($workerSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "Languages:       $([math]::Round($langSize / 1KB, 2)) KB" -ForegroundColor White
Write-Host "------------------------" -ForegroundColor Yellow
Write-Host "TOTAL REQUIRED:  $([math]::Round($totalSize / 1MB, 2)) MB`n" -ForegroundColor Green

# List all other files (potential for deletion)
Write-Host "=== OTHER LANGUAGE FILES (Can be deleted if not used) ===" -ForegroundColor Yellow
$allLanguageFiles = Get-ChildItem -Path $monacoPath -Filter "*.js" -File | 
    Where-Object { 
        $_.Name -notlike "editor.*" -and 
        $_.Name -notlike "loader.js" -and
        $_.Name -notlike "java-*" -and 
        $_.Name -notlike "cpp-*" -and 
        $_.Name -notlike "csharp-*" -and
        $_.Name -notlike "*Mode-*" -and
        $_.Name -notlike "workers-*" -and
        $_.Name -notlike "_common*"
    }

$unusedSize = 0
$unusedCount = 0
foreach ($file in $allLanguageFiles) {
    $size = $file.Length
    $unusedSize += $size
    $unusedCount++
}

Write-Host "Found $unusedCount unused language files" -ForegroundColor Yellow
Write-Host "Potential space savings: $([math]::Round($unusedSize / 1MB, 2)) MB`n" -ForegroundColor Yellow

Write-Host "First 10 unused files:" -ForegroundColor Gray
$allLanguageFiles | Select-Object -First 10 | ForEach-Object {
    $sizeKB = [math]::Round($_.Length / 1KB, 2)
    Write-Host "   - $($_.Name) ($sizeKB KB)" -ForegroundColor DarkGray
}
if ($unusedCount -gt 10) {
    Write-Host "   ... and $($unusedCount - 10) more" -ForegroundColor DarkGray
}

# Generate file list for service worker
Write-Host "`n=== SERVICE WORKER FILE LIST ===" -ForegroundColor Cyan
Write-Host "Add these to your service-worker.js FILES_TO_CACHE array:`n" -ForegroundColor Yellow

Write-Host "  // Monaco Editor core files" -ForegroundColor Green
foreach ($file in $coreFiles) {
    Write-Host "  './node_modules/monaco-editor/min/vs/$file'," -ForegroundColor White
}

Write-Host "`n  // Monaco Editor API" -ForegroundColor Green
foreach ($file in $apiFiles) {
    Write-Host "  './node_modules/monaco-editor/min/vs/$($file.Name)'," -ForegroundColor White
}

Write-Host "`n  // Monaco Workers" -ForegroundColor Green
foreach ($file in $workerFiles) {
    Write-Host "  './node_modules/monaco-editor/min/vs/assets/$($file.Name)'," -ForegroundColor White
}

Write-Host "`n  // Language support" -ForegroundColor Green
foreach ($pattern in $languagePatterns) {
    $langFiles = Get-ChildItem -Path $monacoPath -Filter $pattern -File
    foreach ($file in $langFiles) {
        Write-Host "  './node_modules/monaco-editor/min/vs/$($file.Name)'," -ForegroundColor White
    }
}
if ($basicFile) {
    Write-Host "  './node_modules/monaco-editor/min/vs/basic-languages/monaco.contribution.js'," -ForegroundColor White
}

Write-Host "`n=== ANALYSIS COMPLETE ===`n" -ForegroundColor Cyan

