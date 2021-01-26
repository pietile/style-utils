import { SerializedStyles, css } from '@emotion/react';
import type { CSSInterpolation } from '@emotion/serialize';

type Styles = Record<string, CSSInterpolation>;

export function styleSheet<S extends Styles>(styles: S): { [K in keyof S]: SerializedStyles } {
  const stylesNames = Object.getOwnPropertyNames(styles) as (keyof S)[];
  const serializedStyles = {} as { [K in keyof S]: SerializedStyles };

  for (const styleName of stylesNames) {
    serializedStyles[styleName] = css(styles[styleName]);
  }

  return serializedStyles;
}
