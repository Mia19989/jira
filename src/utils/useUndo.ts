import { useCallback, useReducer } from "react";

const SET = 'SET';
const RESET = 'RESET';
const UNDO = 'UNDO';
const REDO = 'REDO';

type State<T> = {
  past: T[],
  present: T,
  future: T[]
};

type Action<T> = {
  newPresent?: T,
  type: typeof SET | typeof RESET | typeof UNDO | typeof REDO;
}

/** reducer */
const undoRuducer = <T>(state: State<T>, action: Action<T>) => {
  // state是现在的值
  const {past, present, future} = state;
  const {newPresent, type} = action;

  switch(type) {
    case SET: {
      if (newPresent === present) return state;
      // 返回下一个state值
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: []
      };
    }
    case UNDO: {
      if (past.length === 0) return state;

      const newPresent = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: newPresent,
        future: [present, ...future]
      }
    }
    case REDO: {
      if (future.length === 0) return state;

      const newPresent = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: newPresent,
        future: newFuture
      }
    }
  }
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoRuducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  /** 设置新的值 */
  const set = useCallback((newPresent: T) => dispatch({newPresent, type: SET}), []);

  /** 重置 */
  const reset = useCallback((newPresent: T) => dispatch({newPresent, type: RESET}), []);

  /** 倒回 */
  const undo = useCallback(() => dispatch({type: UNDO}), []);

  /** 往前 */
  const redo = useCallback(() => dispatch({type: REDO}), []);

  return [
    state,
    {canUndo, canRedo, set, reset, undo, redo}
  ] as const;
}