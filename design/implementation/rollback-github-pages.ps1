param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$patch = (Resolve-Path (Join-Path $PSScriptRoot 'github-pages-deployment.patch')).Path
Push-Location $repo
try {
  if ($CheckOnly) {
    git apply --reverse --check --binary -- $patch
    if ($LASTEXITCODE -ne 0) { throw 'Rollback patch check failed.' }
    Write-Output 'PASS: GitHub Pages workflow rollback applies cleanly in reverse.'
  } else {
    git apply --reverse --binary -- $patch
    if ($LASTEXITCODE -ne 0) { throw 'Rollback failed.' }
    Write-Output 'Rollback complete: GitHub Pages workflow removed from the working tree.'
  }
} finally {
  Pop-Location
}
