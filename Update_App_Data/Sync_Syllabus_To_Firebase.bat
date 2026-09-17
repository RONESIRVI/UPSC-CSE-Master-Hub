@echo off
chcp 65001 >nul
echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║   RAS Syllabus — Firebase Sync Tool                 ║
echo ║   Excel → Firebase Firestore → Live App Update      ║
echo ╚══════════════════════════════════════════════════════╝
echo.
echo  Source File : Update_App_Data\ras_syllabus_data.xlsx
echo  Firestore   : appData/SYLLABUS_TOPICS
echo  Total       : 182 Topics (Pre + Mains Paper I-IV)
echo.
echo  Uploading syllabus to Firebase... Please wait...
echo.

cd /d "%~dp0.."
node scripts/uploadSyllabusToFirebase.mjs

echo.
echo ══════════════════════════════════════════════════════
if %ERRORLEVEL% EQU 0 (
    echo  SUCCESS: Syllabus synced to Firebase successfully!
    echo  App will update automatically within seconds.
) else (
    echo  ERROR: Something went wrong. Check:
    echo   - firebase-service-account.json exists in project root
    echo   - Internet connection is active
    echo   - Excel file path is correct in the script
)
echo ══════════════════════════════════════════════════════
echo.
pause
