# Architecture Decisions

This document records the key architectural choices made for the PokéSwipe application, along with their reasoning. This practice aligns with our goal of creating a clear, maintainable, and AI-readable codebase.

## State Management

**Choice:** [Zustand](https://github.com/pmndrs/zustand)

**Reasoning:**

1.  **Simplicity and Low Boilerplate:** Zustand offers a simple, hook-based API that is easy to understand and use. It avoids the extensive boilerplate often associated with Redux, making our state management logic more concise and readable. This aligns with our principle of "Choose Clarity Over Cleverness."

2.  **Decoupling Logic from UI:** It allows us to create a centralized store that is completely decoupled from React components. This separation of concerns is crucial for testing and maintainability. Components can subscribe to state changes without being tightly coupled to the state's implementation.

3.  **Performance:** Zustand is designed to prevent unnecessary re-renders. Components only re-render when the specific slice of state they subscribe to changes. This is more efficient than a single, large React Context, which can cause widespread re-renders.

4.  **Predictable State Flow:** By centralizing actions (`addLikedPokemon`, `setCurrentPokemon`), we make state transitions explicit and easy to trace. This aligns with the principle of "Make State Changes Obvious."

**Alternatives Considered:**

*   **React Context:** While built-in, it is not optimized for high-frequency updates and can lead to performance issues if not carefully implemented with `useMemo` and `useCallback`. For a state that will change with every swipe, Zustand provides a more robust solution out of the box.
*   **Redux:** A powerful and mature library, but its complexity and boilerplate (actions, reducers, dispatchers) were deemed unnecessary for the current scope of the project. Zustand provides sufficient power with a much smaller footprint.
