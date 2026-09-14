@echo off
echo ===================================================
echo     UPSC CSE Master Hub - Live Data Sync Tool
echo ===================================================
echo.
echo Syncing Excel data to Firebase Cloud...
echo Please wait...
echo.

call npm run sync-excel

echo.
echo ===================================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Data has been successfully synced to Firebase!
) else (
    echo ERROR: Something went wrong during the sync.
)
echo ===================================================
echo.
pause
