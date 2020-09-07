import { CSSProperties } from '@emotion/serialize';
import { px } from './values';

type MediaOptions =
  | { min: number; max?: never }
  | { min?: never; max: number }
  | { min: number; max: number };

export function media(
  options: MediaOptions,
  styles: CSSProperties,
): Record<string, CSSProperties> {
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

export function mediaMax(max: number): string {
  return `@media screen and (max-width: ${px(max)})`;
}

export function mediaMin(min: number): string {
  return `@media screen an (min-width: ${px(min)})`;
}

export function mediaMinMax(min: number, max: number): string {
  return `@media screen an (min-width: ${px(min)}) and (max-width: ${px(max)})`;
}
