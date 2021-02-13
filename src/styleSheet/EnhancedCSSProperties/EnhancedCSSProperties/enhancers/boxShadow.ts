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
  spread: number;
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

function boxShadowOptionsToString(options: BoxShadowOptions): string {
  const { inset, x, y, color } = options;

  let blur: number | undefined;
  let spread: number | undefined;

  if (isBoxShadowWithSpread(options)) {
    ({ blur, spread } = options);
  } else if (isBoxShadowWithBlur(options)) {
    ({ blur } = options);
  }

  return [inset && 'inset', `${x}px`, `${y}px`, blur && `${blur}px`, spread && `${spread}px`, color]
    .filter(Boolean)
    .join(' ');
}

export function boxShadow(value: BoxShadowOptions | BoxShadowOptions[]): string {
  if (Array.isArray(value)) {
    return value.map(boxShadowOptionsToString).join(', ');
  }

  return boxShadowOptionsToString(value);
}
