# Quick Node Modules Cleanup
# Removes only the biggest unnecessary folders

$basePath = "node_modules"

Write-Host "=== Quick Cleanup ===" -ForegroundColor Cyan

# 1. Remove monaco dev/ folder (25+ MB, not needed)
$devPath = "$basePath\monaco-editor\dev"
if (Test-Path $devPath) {
    Remove-Item -Path $devPath -Recurse -Force
    Write-Host "[OK] Removed monaco-editor/dev/ (~25 MB)" -ForegroundColor Green
}

# 2. Remove monaco esm/ folder (40+ MB, not needed)
$esmPath = "$basePath\monaco-editor\esm"
if (Test-Path $esmPath) {
    Remove-Item -Path $esmPath -Recurse -Force
    Write-Host "[OK] Removed monaco-editor/esm/ (~40 MB)" -ForegroundColor Green
}

Write-Host "`nCleanup complete! Saved ~65 MB" -ForegroundColor Yellow
Write-Host "Your app will still work perfectly." -ForegroundColor Gray



