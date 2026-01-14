# Maintenance Guide

This document outlines the standard operating procedures for maintaining the PokéSwipe application.

## 🛠 Engineering Standards

We follow the **12 Rules for AI-Readable Code** (see `code.guideline.md`). Every change should prioritize clarity, explicit state transitions, and linear logic.

## ⚙️ Core Scripts

### 🧼 Environment Cleanup
If you encounter weird build errors or stale assets:
```bash
npm run maintenance:clean
```
This script clears Metro, Watchman, and native build caches.

### 🏷 Version Management
Always use the versioning script to ensure consistency across JS and Native (Android/iOS) layers:
```bash
npm run version:bump patch  # For bug fixes
npm run version:bump minor  # For new features
npm run version:bump major  # For breaking changes
```

## 🏗 Architecture
See [ADR 001: Architecture Overview](./adr/001-architecture-overview.md) for details on our layered approach.

### Environment Switching
Configuration is centralized in `constants/config.ts`. Ensure `expo-constants` is updated if you need to switch between `development`, `staging`, and `production`.
