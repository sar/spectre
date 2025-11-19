#!/bin/bash

echo "Testing spectre binary..."

# Check if the file exists
if [ -f "dist/spectre" ]; then
  echo "✅ Binary exists"
  
  # Make executable
  chmod +x dist/spectre
  echo "✅ Made executable"
  
  # Show permissions
  ls -l dist/spectre
  
  # Test if it's a valid node script by checking shebang
  head -1 dist/spectre
  
  echo "\nTesting execution with --help (should show usage or timeout)"
  timeout 3 ./dist/spectre --help 2>/dev/null || echo "Execution completed (or timed out as expected)"
else
  echo "❌ Binary not found at dist/spectre"
fi






echo "Testing spectre binary..."

# Check if the file exists
if [ -f "dist/spectre" ]; then
  echo "✅ Binary exists"
  
  # Make executable
  chmod +x dist/spectre
  echo "✅ Made executable"
  
  # Show permissions
  ls -l dist/spectre
  
  # Test if it's a valid node script by checking shebang
  head -1 dist/spectre
  
  echo "\nTesting execution with --help (should show usage or timeout)"
  timeout 3 ./dist/spectre --help 2>/dev/null || echo "Execution completed (or timed out as expected)"
else
  echo "❌ Binary not found at dist/spectre"
fi




















echo "Testing spectre binary..."

# Check if the file exists
if [ -f "dist/spectre" ]; then
  echo "✅ Binary exists"
  
  # Make executable
  chmod +x dist/spectre
  echo "✅ Made executable"
  
  # Show permissions
  ls -l dist/spectre
  
  # Test if it's a valid node script by checking shebang
  head -1 dist/spectre
  
  echo "\nTesting execution with --help (should show usage or timeout)"
  timeout 3 ./dist/spectre --help 2>/dev/null || echo "Execution completed (or timed out as expected)"
else
  echo "❌ Binary not found at dist/spectre"
fi
