declare module 'react' {
  export type ReactNode = unknown;
  export type ComponentType<P = {}> = (props: P) => unknown;
  export function useState<S>(initial: S | (() => S)): [S, (next: S) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
}

declare module 'next/navigation' {
  export function notFound(): never;
  export function useRouter(): { push: (href: string) => void; replace: (href: string) => void; back: () => void };
}

declare module 'vitest' {
  export const describe: (...args: unknown[]) => unknown;
  export const it: (...args: unknown[]) => unknown;
  export const test: (...args: unknown[]) => unknown;
  export const expect: (...args: unknown[]) => unknown;
  export const beforeEach: (...args: unknown[]) => unknown;
  export const afterEach: (...args: unknown[]) => unknown;
  export const beforeAll: (...args: unknown[]) => unknown;
  export const afterAll: (...args: unknown[]) => unknown;
  export const vi: Record<string, (...args: unknown[]) => unknown>;
}

declare module '*.css';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
  interface IntrinsicAttributes {
    key?: string | number;
  }
}
