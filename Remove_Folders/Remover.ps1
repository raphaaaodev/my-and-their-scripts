Function Get-Folder($initialDirectory="")

{
Add-Type -AssemblyName System.Windows.Forms
$FolderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
$FolderBrowser.Description = 'Select the folder containing the data'
$FolderBrowser.rootfolder = "MyComputer"
$result = $FolderBrowser.ShowDialog((New-Object System.Windows.Forms.Form -Property @{TopMost = $true }))
if ($result -eq [Windows.Forms.DialogResult]::OK){
    return $FolderBrowser.SelectedPath
}
else {
    exit
}
    
}
write-host "
--------- Running Get-Folder ---------
"
$Path = Get-Folder
$pwd = (Get-Item .).FullName
write-host "pwd: $($pwd)"
write-host "path: $($Path)"
write-host "
--------- Stop Get-Folder ---------
"

write-host "--------- Running Get-ChildItem Recurse ---------"
$counter = 0
if ($Path -ne $null -or $path -ne $pwd){
    cd $Path
    $folders = Get-ChildItem $Path -Directory

    foreach ($folder in $folders) {
         
        $folderPath = "$($folder.FullName.replace('[', '`[').replace(']', '`]'))"
        
        if ((Test-Path -Path "$($folderPath)\*.mp3") -eq $false) {
            $counter = $counter + 1
            Remove-Item $folderPath -Force  -Recurse -ErrorAction SilentlyContinue
        }
    }
} else {write-host "Script não executado"}
write-host "
--------- Stop Get-ChildItem Recurse ---------"
write-host "Foram removidas $($counter) pastas"


# ----------- EXIT -------------