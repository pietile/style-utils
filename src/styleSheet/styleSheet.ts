import { SerializedStyles, css } from '@emotion/react';
import {
  CSSObject,
  toCSSObject,
  EnhancedCSSObject,
} from './EnhancedCSSProperties';

type Styles = Record<string, CSSObject<EnhancedCSSObject>>;

type Result<S> = { [K in keyof S]: SerializedStyles };

export function styleSheet<S extends Styles>(styles: S): Result<S> {
  const result = {} as Result<S>;

  Object.entries(styles).forEach(([key, value]) => {
    const cssObject: any = toCSSObject(value);

    result[key as keyof Result<S>] = css(cssObject);
  });

  return result;
}
