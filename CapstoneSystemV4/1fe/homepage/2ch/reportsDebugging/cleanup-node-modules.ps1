# PowerShell Script to Clean Up node_modules
# This removes unnecessary files while keeping only what's needed for offline use

Write-Host "`n=== Node Modules Cleanup Script ===" -ForegroundColor Cyan
Write-Host "Analyzing and cleaning unnecessary files...`n" -ForegroundColor Yellow

$basePath = "node_modules"

# Calculate initial size
$initialSize = (Get-ChildItem -Path $basePath -Recurse -File | Measure-Object -Property Length -Sum).Sum

Write-Host "Initial size: $([math]::Round($initialSize / 1MB, 2)) MB`n" -ForegroundColor White

# ============================================
# STEP 1: Clean Monaco Editor
# ============================================
Write-Host "STEP 1: Cleaning Monaco Editor..." -ForegroundColor Green

# Remove dev folder (not needed, we use min/)
$devPath = Join-Path $basePath "monaco-editor\dev"
if (Test-Path $devPath) {
    $devSize = (Get-ChildItem -Path $devPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path $devPath -Recurse -Force
    Write-Host "  [OK] Removed dev/ folder ($([math]::Round($devSize / 1MB, 2)) MB)" -ForegroundColor Yellow
}

# Remove esm folder (not needed, we use min/)
$esmPath = Join-Path $basePath "monaco-editor\esm"
if (Test-Path $esmPath) {
    $esmSize = (Get-ChildItem -Path $esmPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
    Remove-Item -Path $esmPath -Recurse -Force
    Write-Host "  [OK] Removed esm/ folder ($([math]::Round($esmSize / 1MB, 2)) MB)" -ForegroundColor Yellow
}

# Remove unnecessary language files from min/vs/
$monacoMinPath = Join-Path $basePath "monaco-editor\min\vs"

# Languages to KEEP (Java, C++, C#, and required ones)
$keepLanguages = @(
    "java-*.js",
    "cpp-*.js", 
    "csharp-*.js",
    "editor.api-*.js",
    "workers-*.js",
    "_commonjsHelpers-*.js",
    "loader.js"
)

# Get all language files
$allLangFiles = Get-ChildItem -Path $monacoMinPath -Filter "*.js" -File

$removedCount = 0
$removedSize = 0

foreach ($file in $allLangFiles) {
    $shouldKeep = $false
    
    # Check if it matches any pattern we want to keep
    foreach ($pattern in $keepLanguages) {
        if ($file.Name -like $pattern) {
            $shouldKeep = $true
            break
        }
    }
    
    # Check if it's a mode file (needed)
    if ($file.Name -like "*Mode-*.js") {
        $shouldKeep = $true
    }
    
    # If it's not in our keep list, remove it
    if (-not $shouldKeep) {
        $removedSize += $file.Length
        Remove-Item -Path $file.FullName -Force
        $removedCount++
    }
}

Write-Host "  [OK] Removed $removedCount unused language files ($([math]::Round($removedSize / 1MB, 2)) MB)" -ForegroundColor Yellow

# Remove language folders we don't need from min/vs/language/
$languagePath = Join-Path $monacoMinPath "language"
if (Test-Path $languagePath) {
    # We don't use the advanced language services, but keep the folder structure
    Write-Host "  [INFO] Keeping language/ folder (may contain runtime dependencies)" -ForegroundColor Gray
}

# ============================================
# STEP 2: Check marked and dompurify usage
# ============================================
Write-Host "`nSTEP 2: Analyzing marked and dompurify..." -ForegroundColor Green

# These are Monaco dependencies but may not be used in min/ build
# We'll keep them for safety unless they're large

$markedPath = Join-Path $basePath "marked"
$dompurifyPath = Join-Path $basePath "dompurify"

if (Test-Path $markedPath) {
    $markedSize = (Get-ChildItem -Path $markedPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
    Write-Host "  [INFO] marked package: $([math]::Round($markedSize / 1MB, 2)) MB" -ForegroundColor Gray
    Write-Host "  [KEEP] Keeping marked (Monaco dependency)" -ForegroundColor Green
}

if (Test-Path $dompurifyPath) {
    $dompurifySize = (Get-ChildItem -Path $dompurifyPath -Recurse -File | Measure-Object -Property Length -Sum).Sum
    Write-Host "  [INFO] dompurify package: $([math]::Round($dompurifySize / 1MB, 2)) MB" -ForegroundColor Gray
    Write-Host "  [KEEP] Keeping dompurify (Monaco dependency)" -ForegroundColor Green
}

# ============================================
# STEP 3: Remove documentation files
# ============================================
Write-Host "`nSTEP 3: Removing documentation files..." -ForegroundColor Green

$docPatterns = @("README.md", "CHANGELOG.md", "LICENSE", "*.txt", "*.md")
$docRemovedSize = 0
$docRemovedCount = 0

foreach ($pattern in $docPatterns) {
    $docFiles = Get-ChildItem -Path $basePath -Filter $pattern -File -Recurse -ErrorAction SilentlyContinue
    foreach ($file in $docFiles) {
        # Skip root package.json files
        if ($file.Name -eq "package.json") { continue }
        
        $docRemovedSize += $file.Length
        Remove-Item -Path $file.FullName -Force -ErrorAction SilentlyContinue
        $docRemovedCount++
    }
}

Write-Host "  [OK] Removed $docRemovedCount documentation files ($([math]::Round($docRemovedSize / 1KB, 2)) KB)" -ForegroundColor Yellow

# ============================================
# SUMMARY
# ============================================
Write-Host "`n=== CLEANUP SUMMARY ===" -ForegroundColor Cyan

$finalSize = (Get-ChildItem -Path $basePath -Recurse -File | Measure-Object -Property Length -Sum).Sum
$savedSize = $initialSize - $finalSize

Write-Host "Before: $([math]::Round($initialSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "After:  $([math]::Round($finalSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "Saved:  $([math]::Round($savedSize / 1MB, 2)) MB ($([math]::Round(($savedSize / $initialSize) * 100, 1))%)" -ForegroundColor Green

Write-Host "`n=== FILES KEPT ===" -ForegroundColor Cyan
Write-Host "Monaco Editor min/ folder with:" -ForegroundColor White
Write-Host "  - Core files (loader.js, editor/)" -ForegroundColor Gray
Write-Host "  - Java, C++, C# language support" -ForegroundColor Gray
Write-Host "  - Worker files (assets/)" -ForegroundColor Gray
Write-Host "  - Basic languages contribution" -ForegroundColor Gray
Write-Host "marked package (Monaco dependency)" -ForegroundColor White
Write-Host "dompurify package (Monaco dependency)" -ForegroundColor White

Write-Host "`n=== CLEANUP COMPLETE ===" -ForegroundColor Green
Write-Host "Your app should still work perfectly offline!`n" -ForegroundColor Yellow



