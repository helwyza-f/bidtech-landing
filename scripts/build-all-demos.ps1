# Build all template demos using the build script
$repoRoot = "$PSScriptRoot\.."

$allDemos = @(
    "beauty-wellness",
    "beauty-wellness-2",
    "e-commerce",
    "restaurant-cafe",
    "restaurant-cafe-2",
    "organization",
    "community-pro",
    "property",
    "smartbelajar",
    "nivoraacademy",
    "aliansi-kepemimpinan-indonesia",
    "tehin",
    "pinjammobil",
    "forcevault",
    "elevasi"
)

$failed = @()

foreach ($demo in $allDemos) {
    Write-Host "`n==> Building: $demo" -ForegroundColor Cyan
    Push-Location $repoRoot
    $result = & node scripts/build-template-demos.js $demo --skip-install 2>&1
    $exitCode = $LASTEXITCODE
    Pop-Location
    
    if ($exitCode -eq 0) {
        Write-Host "==> SUCCESS: $demo" -ForegroundColor Green
    } else {
        Write-Host "==> FAILED: $demo" -ForegroundColor Red
        $failed += $demo
    }
}

Write-Host "`n=== Build Summary ===" -ForegroundColor Magenta
if ($failed.Count -eq 0) {
    Write-Host "All demos built successfully!" -ForegroundColor Green
} else {
    Write-Host "Failed demos: $($failed -join ', ')" -ForegroundColor Red
}
