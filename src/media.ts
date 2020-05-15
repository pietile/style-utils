import type { CSSProperties } from '@emotion/serialize';

type MediaOptions =
  | { min: number; max?: never }
  | { min?: never; max: number }
  | { min: number; max: number };

export function media(options: MediaOptions, styles: CSSProperties): Record<string, CSSProperties> {
  const query = [];
  if (options.min) {
    query.push(`(min-width: ${options.min}px)`);
  }

  if (options.max) {
    query.push(`(max-width: ${options.max}px)`);
  }

  return {
    [`@media only screen and ${query.join(' and ')}`]: styles,
  };
}
