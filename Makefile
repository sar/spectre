# Makefile for Spectre AI

build:
	npm run build

clean:
	npm run clean

install:
	npm install

.PHONY: build clean install

# Build TypeScript files
.PHONY: build

	npm run build

# Bundle the application
.PHONY: bundle

	npm run bundle

# Install binary
.PHONY: install-binary

install-binary:	node install-binary.js

# Test binary
.PHONY: test-binary

test-binary:	node test-binary.js

# Run the application
.PHONY: run

run:	make build && node dist/index.js

# Dev mode (using tsx)
.PHONY: dev

dev:	tsx index.ts

# Help target
.PHONY: help

help:
	@echo "Available targets:"
	@echo "  all          - Build and bundle (default)"
	@echo "  clean        - Remove dist directory"
	@echo "  build        - Compile TypeScript files"
	@echo "  bundle       - Bundle the application"
	@echo "  install-binary - Install binary"
	@echo "  test-binary  - Test binary"
	@echo "  run          - Run the built application"
	@echo "  dev          - Development mode with tsx"
	@echo "  help         - Show this help"
