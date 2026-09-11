@echo off
title UPSC CSE Master Hub - Auto Push
color 0A

echo =======================================================
echo     UPSC CSE Master Hub - Auto GitHub Push Script
echo =======================================================
echo.
echo [1/3] Adding new Excel updates...
cd ..
git add "Update_App_Data/upsc_toppers_data.xlsx"
git add .

echo.
echo [2/3] Saving changes...
git commit -m "Update App Content via Excel"

echo.
echo [3/3] Pushing to GitHub (Please wait)...
git push origin main

echo.
echo =======================================================
echo  SUCCESS! Your app will be updated live in a few mins.
echo =======================================================
echo.
pause
