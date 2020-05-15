import { SerializedStyles, css } from '@emotion/core';
import type { CSSProperties, CSSPropertiesWithMultiValues } from '@emotion/serialize';

type ValidateStyle<Style> = {
  [Property in keyof Style]: Property extends keyof CSSProperties
    ? CSSProperties[Property]
    : Style[Property] extends CSSProperties
    ? ValidateStyle<Style[Property]>
    : never;
};

type ValidateStyleSheet<StyleSheet> = {
  [Key in keyof StyleSheet]: ValidateStyle<StyleSheet[Key]>;
};

type SerializedStyleSheet<StyleSheet> = { [Key in keyof StyleSheet]: SerializedStyles };

export function styleSheet<S extends ValidateStyleSheet<S>>(styles: S): SerializedStyleSheet<S> {
  const serializedStyles = {} as SerializedStyleSheet<S>;

  Object.entries<CSSPropertiesWithMultiValues>(styles).forEach(([key, value]): void => {
    serializedStyles[key as keyof S] = css(value);
  });

  return serializedStyles;
}
