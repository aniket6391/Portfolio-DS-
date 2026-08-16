Write-Host "Watching for changes in Portfolio to push to GitHub..." -ForegroundColor Green
$repoPath = ".\"

while ($true) {
    Start-Sleep -Seconds 30
    
    # Check if there are changes
    $status = git status --porcelain
    if ($status) {
        Write-Host "Changes detected. Committing and pushing..." -ForegroundColor Yellow
        git add .
        $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto update: $date"
        git push
        Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    }
}
