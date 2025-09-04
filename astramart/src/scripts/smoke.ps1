$ErrorActionPreference = "Stop"
$base = $env:BASE_URL
if (-not $base) { $base = "http://localhost:3000" }

function Test-Route($path) {
	try {
		$resp = Invoke-WebRequest -Uri ("$base$path") -UseBasicParsing -TimeoutSec 10
		if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
			Write-Host "OK $path $($resp.StatusCode)"
			return $true
		} else {
			Write-Host "FAIL $path $($resp.StatusCode)"
			return $false
		}
	} catch {
		Write-Host "ERR  $path $($_.Exception.Message)"
		return $false
	}
}

$allOk = $true
$allOk = (Test-Route "/") -and $allOk
$allOk = (Test-Route "/catalog") -and $allOk
$allOk = (Test-Route "/product/starlight-headphones") -and $allOk
$allOk = (Test-Route "/cart") -and $allOk
$allOk = (Test-Route "/api/products") -and $allOk

if (-not $allOk) { exit 1 } else { exit 0 }
