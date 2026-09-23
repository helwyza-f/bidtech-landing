# Install npm dependencies for all templates that don't have node_modules yet
$templatesRoot = "$PSScriptRoot\..\templates"

$templatePaths = @(
    "beauty-wellness\template-1",
    "beauty-wellness\template-2",
    "e-commerce\template-1",
    "e-commerce\template-2",
    "restaurant-cafe\template-1",
    "restaurant-cafe\template-2",
    "organization\template-1",
    "organization\template-2",
    "organization\template-4",
    "property\template-1",
    "education\template-1",
    "education\template-2",
    "umkm\template-1",
    "automotive\template-2",
    "construction-industrial\template-1"
)

foreach ($templatePath in $templatePaths) {
    $fullPath = Join-Path $templatesRoot $templatePath
    $nodeModulesPath = Join-Path $fullPath "node_modules"
    $packageJsonPath = Join-Path $fullPath "package.json"
    
    if (-not (Test-Path $packageJsonPath)) {
        Write-Host "==> SKIP (no package.json): $templatePath" -ForegroundColor Yellow
        continue
    }
    
    if (Test-Path $nodeModulesPath) {
        Write-Host "==> Already installed: $templatePath" -ForegroundColor Green
        continue
    }
    
    Write-Host "==> Installing: $templatePath" -ForegroundColor Cyan
    Push-Location $fullPath
    npm install --no-audit --no-fund
    Pop-Location
    Write-Host "==> Done: $templatePath" -ForegroundColor Green
}

Write-Host "`n==> All installations complete!" -ForegroundColor Magenta
