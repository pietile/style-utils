import { CSSProperties } from '../CSSProperties';
import { enhancers, Enhancers } from './enhancers';

export type EnhancedCSSProperties = {
  [K in keyof CSSProperties]: K extends keyof Enhancers
    ? Parameters<Enhancers[K]>[0]
    : CSSProperties[K];
};

export function toCSSProperty(property: string, value: any) {
  if (property in enhancers) {
    return enhancers[property as keyof Enhancers](value);
  }

  return value;
}
