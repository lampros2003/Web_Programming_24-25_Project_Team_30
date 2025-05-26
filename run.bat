@echo off
echo Running Restaurant Web Application...

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

//init database 
if not exist "db\" (
    echo Initializing database...
    call npm run init-db
)


echo Starting server...
call npm start
// Check if the server started 
if %errorlevel% neq 0 (
    echo Failed to start the server. Please check the error messages above.
    exit /b %errorlevel%

)



echo.
echo application should be running at http://localhost:3000
echo.

REM If the server closes, keep the window open
pause
