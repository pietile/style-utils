import { px } from './values';

interface BoxShadow {
  inset?: boolean;
  x: number;
  y: number;
  color: string;
  blur?: never;
  spread?: never;
}

interface BoxShadowWithBlur {
  inset?: boolean;
  x: number;
  y: number;
  color: string;
  blur: number;
  spread?: never;
}

interface BoxShadowWithSpread {
  inset?: boolean;
  x: number;
  y: number;
  color: string;
  blur: number;
  spread: never;
}

type BoxShadowOptions = BoxShadow | BoxShadowWithBlur | BoxShadowWithSpread;

function isBoxShadowWithBlur(shadowOption: BoxShadowOptions): shadowOption is BoxShadowWithSpread {
  return 'blur' in shadowOption;
}

function isBoxShadowWithSpread(
  shadowOption: BoxShadowOptions,
): shadowOption is BoxShadowWithSpread {
  return 'blur' in shadowOption && 'spread' in shadowOption;
}

export function boxShadow(...shadowOptions: BoxShadowOptions[]): string {
  return shadowOptions
    .map((shadowOption) => {
      const { inset, x, y, color } = shadowOption;

      let blur;
      let spread;

      if (isBoxShadowWithSpread(shadowOption)) {
        ({ blur, spread } = shadowOption);
      } else if (isBoxShadowWithBlur(shadowOption)) {
        ({ blur } = shadowOption);
      }

      return [inset && 'inset', px(x), px(y), blur && px(blur), spread && px(spread), color]
        .filter(Boolean)
        .join(' ');
    })
    .join(', ');
}
