#!/bin/bash

# Silent Connect Backend - Test Runner Script
# This script runs all tests and generates reports

echo "🧪 Silent Connect Backend Test Suite"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node modules are installed
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Set test environment variables
export NODE_ENV=test
export MONGODB_URI="${MONGODB_URI:-mongodb://localhost:27017/silent_connect_test}"
export JWT_SECRET="${JWT_SECRET:-test-jwt-secret-key-12345}"

echo "${GREEN}✅ Environment configured${NC}"
echo "   MongoDB: $MONGODB_URI"
echo ""

# Run unit tests
echo "${YELLOW}🔬 Running Unit Tests...${NC}"
npm test -- --passWithNoTests
UNIT_RESULT=$?

if [ $UNIT_RESULT -eq 0 ]; then
    echo "${GREEN}✅ Unit tests passed!${NC}"
else
    echo "${RED}❌ Unit tests failed!${NC}"
fi

echo ""

# Run E2E tests
echo "${YELLOW}🌐 Running E2E Tests...${NC}"
npm run test:e2e -- --passWithNoTests
E2E_RESULT=$?

if [ $E2E_RESULT -eq 0 ]; then
    echo "${GREEN}✅ E2E tests passed!${NC}"
else
    echo "${RED}❌ E2E tests failed!${NC}"
fi

echo ""

# Generate coverage report
echo "${YELLOW}📊 Generating Coverage Report...${NC}"
npm run test:cov -- --passWithNoTests
COVERAGE_RESULT=$?

if [ $COVERAGE_RESULT -eq 0 ]; then
    echo "${GREEN}✅ Coverage report generated!${NC}"
    echo "   View report: coverage/index.html"
else
    echo "${RED}❌ Coverage generation failed!${NC}"
fi

echo ""
echo "===================================="
echo "Test Results Summary:"
echo "===================================="

if [ $UNIT_RESULT -eq 0 ]; then
    echo "${GREEN}✅ Unit Tests: PASSED${NC}"
else
    echo "${RED}❌ Unit Tests: FAILED${NC}"
fi

if [ $E2E_RESULT -eq 0 ]; then
    echo "${GREEN}✅ E2E Tests: PASSED${NC}"
else
    echo "${RED}❌ E2E Tests: FAILED${NC}"
fi

if [ $COVERAGE_RESULT -eq 0 ]; then
    echo "${GREEN}✅ Coverage: GENERATED${NC}"
else
    echo "${RED}❌ Coverage: FAILED${NC}"
fi

echo "===================================="

# Exit with error if any test failed
if [ $UNIT_RESULT -ne 0 ] || [ $E2E_RESULT -ne 0 ]; then
    exit 1
else
    exit 0
fi
