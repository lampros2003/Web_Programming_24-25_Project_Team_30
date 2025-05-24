@echo off
echo Running Restaurant Web Application...

REM Force clean install if sqlite3 is missing
echo Checking for required dependencies...
node -e "try { require('sqlite3'); require('sqlite'); console.log('Database dependencies found'); } catch(e) { console.log('Missing dependencies detected'); process.exit(1); }" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Database dependencies missing. Performing clean install...
    if exist "node_modules\" rmdir /s /q "node_modules"
    if exist "package-lock.json" del "package-lock.json"
)

REM Check if node_modules exists or if we need to install
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error installing dependencies. Trying with --force flag...
        call npm install --force
        if %ERRORLEVEL% NEQ 0 (
            echo Failed to install dependencies. Please check your npm configuration.
            pause
            exit /b 1
        )
    )
) else (
    echo Dependencies directory exists. Verifying installation...
    call npm install
)

REM Final dependency check
echo Verifying all required modules are available...
node -e "try { require('sqlite3'); require('sqlite'); require('express'); console.log('All dependencies verified successfully'); } catch(e) { console.log('Dependency verification failed:', e.message); process.exit(1); }"
if %ERRORLEVEL% NEQ 0 (
    echo Critical dependencies are still missing. Please run 'npm install' manually.
    pause
    exit /b 1
)

echo Initializing database with sample data...
call npm run init-db
if %ERRORLEVEL% NEQ 0 (
    echo Warning: Database initialization failed. Continuing anyway...
)

echo Starting server...
call npm start

echo.
echo Your application should be running at http://localhost:3000
echo If using a different port, please check the console output above for the correct URL.
echo.

REM If the server closes, keep the window open
pause
