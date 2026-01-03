# Silent Connect Backend - Test Runner (Windows)
# This script runs all tests and generates reports

Write-Host "🧪 Silent Connect Backend Test Suite" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node modules are installed
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Set test environment variables
$env:NODE_ENV = "test"
if (-Not $env:MONGODB_URI) {
    $env:MONGODB_URI = "mongodb://localhost:27017/silent_connect_test"
}
if (-Not $env:JWT_SECRET) {
    $env:JWT_SECRET = "test-jwt-secret-key-12345"
}

Write-Host "✅ Environment configured" -ForegroundColor Green
Write-Host "   MongoDB: $env:MONGODB_URI"
Write-Host ""

# Run unit tests
Write-Host "🔬 Running Unit Tests..." -ForegroundColor Yellow
npm test -- --passWithNoTests
$unitResult = $LASTEXITCODE

if ($unitResult -eq 0) {
    Write-Host "✅ Unit tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Unit tests failed!" -ForegroundColor Red
}

Write-Host ""

# Run E2E tests
Write-Host "🌐 Running E2E Tests..." -ForegroundColor Yellow
npm run test:e2e -- --passWithNoTests
$e2eResult = $LASTEXITCODE

if ($e2eResult -eq 0) {
    Write-Host "✅ E2E tests passed!" -ForegroundColor Green
} else {
    Write-Host "❌ E2E tests failed!" -ForegroundColor Red
}

Write-Host ""

# Generate coverage report
Write-Host "📊 Generating Coverage Report..." -ForegroundColor Yellow
npm run test:cov -- --passWithNoTests
$coverageResult = $LASTEXITCODE

if ($coverageResult -eq 0) {
    Write-Host "✅ Coverage report generated!" -ForegroundColor Green
    Write-Host "   View report: coverage/index.html"
} else {
    Write-Host "❌ Coverage generation failed!" -ForegroundColor Red
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Test Results Summary:" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

if ($unitResult -eq 0) {
    Write-Host "✅ Unit Tests: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Unit Tests: FAILED" -ForegroundColor Red
}

if ($e2eResult -eq 0) {
    Write-Host "✅ E2E Tests: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ E2E Tests: FAILED" -ForegroundColor Red
}

if ($coverageResult -eq 0) {
    Write-Host "✅ Coverage: GENERATED" -ForegroundColor Green
} else {
    Write-Host "❌ Coverage: FAILED" -ForegroundColor Red
}

Write-Host "====================================" -ForegroundColor Cyan

# Exit with error if any test failed
if (($unitResult -ne 0) -or ($e2eResult -ne 0)) {
    exit 1
} else {
    exit 0
}
