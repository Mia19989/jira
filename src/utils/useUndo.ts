import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  });

  /** 设置新的值 */
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const {past, present, future} = currentState;
      if (newPresent === present) return currentState;

      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, []);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  /** 重置 */
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  }, []);

  /** 倒回 */
  const undo = useCallback(() => {
    setState((currentState) => {
      const {past, present, future} = currentState;

      if (past.length === 0) return currentState;

      const newPresent = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: newPresent,
        future: [present, ...future]
      }
    })
  }, []);

  /** 往前 */
  const redo = useCallback(() => {
    setState((currentState) => {
      const {past, present, future} = currentState;

      if (future.length === 0) return currentState;

      const newPresent = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: newPresent,
        future: newFuture
      }
    })
  }, []);

  return [
    state,
    {canUndo, canRedo, set, reset, undo, redo}
  ] as const;
}