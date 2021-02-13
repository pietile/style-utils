import * as CSS from 'csstype';
import { CSSProperties } from './CSSProperties';
import { toCSSProperty, EnhancedCSSProperties } from './EnhancedCSSProperties';

type CSSPseudos<P> = { [K in CSS.Pseudos]?: CSSObject<P> };

interface CSSOthersObject<P> {
  [propertiesName: string]: CSSObject<P>;
}

export type CSSObject<P> = (P & CSSPseudos<P>) | CSSOthersObject<P>;

export type EnhancedCSSObject = CSSObject<EnhancedCSSProperties>;

export function toCSSObject(
  cssObject: EnhancedCSSObject,
): CSSObject<CSSProperties> {
  const result: any = {};

  Object.entries(cssObject).forEach(([key, value]) => {
    let cleanValue = toCSSProperty(key, value);

    if (typeof cleanValue === 'object') {
      cleanValue = toCSSObject(cleanValue);
    }

    result[key] = cleanValue;
  });

  return result;
}
