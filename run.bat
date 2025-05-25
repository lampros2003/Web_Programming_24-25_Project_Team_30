@echo off
echo Running Restaurant Web Application...

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

echo Starting server...
call npm start

echo.
echo Your application should be running at http://localhost:3000
echo If using a different port, please check the console output above for the correct URL.
echo.

REM If the server closes, keep the window open
pause
