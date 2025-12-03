# Clean Monaco vs/ folder - Remove all unused language files

$vsPath = "node_modules\monaco-editor\min\vs"

Write-Host "`n=== Cleaning Monaco vs/ Folder ===" -ForegroundColor Cyan

# Files to KEEP
$keepPatterns = @(
    "java-*.js",
    "cpp-*.js", 
    "csharp-*.js",
    "loader.js",
    "editor.*",
    "workers-*.js",
    "_commonjsHelpers-*.js",
    "*Mode-*.js",
    "nls.messages-loader.js",
    "lspLanguageFeatures-*.js"
)

# Get all .js files
$allFiles = Get-ChildItem $vsPath -File -Filter "*.js"

$deletedCount = 0
$deletedSize = 0

foreach ($file in $allFiles) {
    $shouldKeep = $false
    
    # Check if file matches any keep pattern
    foreach ($pattern in $keepPatterns) {
        if ($file.Name -like $pattern) {
            $shouldKeep = $true
            break
        }
    }
    
    # If not in keep list, delete it
    if (-not $shouldKeep) {
        $deletedSize += $file.Length
        Remove-Item $file.FullName -Force
        $deletedCount++
    }
}

Write-Host "[OK] Deleted $deletedCount unused language files ($([math]::Round($deletedSize / 1MB, 2)) MB)" -ForegroundColor Green

# Now delete ALL NLS translation files (we only need English)
Write-Host "`nDeleting translation files..." -ForegroundColor Yellow
$nlsFiles = Get-ChildItem $vsPath -File -Filter "nls.messages.*.js"
$nlsSize = 0
$nlsCount = 0

foreach ($file in $nlsFiles) {
    $nlsSize += $file.Length
    Remove-Item $file.FullName -Force
    $nlsCount++
}

Write-Host "[OK] Deleted $nlsCount translation files ($([math]::Round($nlsSize / 1MB, 2)) MB)" -ForegroundColor Green

Write-Host "`n=== CLEANUP COMPLETE ===" -ForegroundColor Cyan
Write-Host "Total files deleted: $($deletedCount + $nlsCount)" -ForegroundColor White
Write-Host "Total space saved: $([math]::Round(($deletedSize + $nlsSize) / 1MB, 2)) MB" -ForegroundColor Green



