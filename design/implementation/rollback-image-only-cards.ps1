param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$patch = (Resolve-Path (Join-Path $PSScriptRoot 'image-only-cards.patch')).Path
Push-Location $repo
try {
  if ($CheckOnly) {
    git apply --reverse --check --binary -- $patch
    if ($LASTEXITCODE -ne 0) { throw 'Rollback patch check failed.' }
    Write-Output 'PASS: image-only card rollback applies cleanly in reverse.'
  } else {
    git apply --reverse --binary -- $patch
    if ($LASTEXITCODE -ne 0) { throw 'Rollback failed.' }
    Write-Output 'Rollback complete: project cards restored to the duplicated preview layout.'
  }
} finally {
  Pop-Location
}
