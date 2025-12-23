// Libraries
import type { StateCreator } from 'zustand';

// Lazy load Reactotron to avoid circular dependency
let Reactotron: any = null;
const getReactotron = () => {
  if (!Reactotron && __DEV__) {
    try {
      // Lazy import to break circular dependency
      Reactotron = require('@/src/ReactotronConfig').default;
    } catch (error) {
      console.warn('Reactotron не вдалося завантажити:', error);
    }
  }
  return Reactotron;
};

// Helpers
function isFunction(value: unknown): value is (...args: never[]) => unknown {
  return typeof value === 'function';
}

function extractStateOnly<T extends object>(state: T): Partial<T> {
  const result: Partial<T> = {};

  (Object.keys(state) as (keyof T)[]).forEach((key: keyof T) => {
    const value = state[key];

    if (!isFunction(value)) {
      result[key] = value;
    }
  });

  return result;
}

export const zustandLogger =
  <T extends object>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const prevState: T = get() as T;
        const prevData: Partial<T> = extractStateOnly(prevState);

        const nextState: Partial<T> | T =
          typeof partial === 'function'
            ? (partial as (state: T) => T | Partial<T>)(prevState)
            : partial;

        const fullState: T = {
          ...prevState,
          ...(nextState as Partial<T>),
        };

        const fullData: Partial<T> = extractStateOnly(fullState);

        const diff: Partial<T> = {};
        (Object.keys(fullData) as (keyof T)[]).forEach((key: keyof T) => {
          if (prevData[key] !== fullData[key]) {
            diff[key] = fullData[key];
          }
        });

        // Patch log
        const reactotron = getReactotron();
        reactotron?.log?.({
          type: 'ZUSTAND_SET',
          replace,
          partial: nextState,
        });

        // Full state snapshot (ONLY data, no functions)
        reactotron?.log?.({
          type: 'FULL_STATE',
          state: fullData,
        });

        // Diff (ONLY changed data keys)
        reactotron?.log?.({
          type: 'ZUSTAND_DIFF',
          diff,
        });

        // Always partial update
        set(nextState as Partial<T>, false);
      },
      get,
      api,
    );

// ---------- Named actions helper ----------

export function logZustandAction<T extends object, K extends keyof T>(
  action: string,
  slice: K,
  before: T[K],
  after: T[K],
): void {
  const reactotron = getReactotron();
  reactotron?.log?.({
    type: 'ZUSTAND_ACTION',
    action,
    slice: String(slice),
    before,
    after,
  });
}
