import type { CSSProperties } from 'react';

type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

/** Lets us pass CSS custom properties through the `style` prop without casts everywhere. */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as unknown as CSSProperties;
}
