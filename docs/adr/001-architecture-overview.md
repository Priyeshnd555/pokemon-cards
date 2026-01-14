# ADR 001: Architecture Overview

## Status
Accepted

## Context
The project needs a robust, scalable architecture that supports long-term maintenance and is easily 
understandable by both human developers and AI assistants. 

## Decision
We adopt a Clean Architecture inspired layered approach, adapted for React Native / Expo:

1.  **Constants Layer**: Centralized configuration and immutable values.
2.  **State/Service Layer**: Business logic and data management (Zustand + Context).
3.  **Hooks Layer**: Reusable UI logic and data fetching orchestration.
4.  **Presentation Layer**: Atomic components and screen-level layouts.

### Key Principles
- **Explicit over Implicit**: State transitions must be documented and obvious.
- **Linear Flow**: Avoid deep nesting and complex branching.
- **AI-Readable**: Adhere to `code.guideline.md` for all new implementations.

## Consequences
- Increased upfront boilerplate for configuration.
- Significantly improved debuggability and onboarding speed.
- Consistent behavior across iOS and Android platforms.
