import { GlobalValues } from '../../../../types';

type BackgroundRepeatValues =
  | 'repeat-x'
  | 'repeat-y'
  | 'repeat'
  | 'space'
  | 'round'
  | 'no-repeat';

type BackgroundAttachment = 'scroll' | 'fixed' | 'local' | GlobalValues;
type BackgroundClip =
  | 'border-box'
  | 'padding-box'
  | 'content-box'
  | 'text'
  | GlobalValues;
type BackgroundColor = string | GlobalValues;
type BackgroundImage = string;
type BackgroundOrigin =
  | 'border-box'
  | 'padding-box'
  | 'content-box'
  | GlobalValues;
type BackgroundPosition = string | GlobalValues;
type BackgroundRepeat =
  | BackgroundRepeatValues
  | [BackgroundRepeatValues, BackgroundRepeatValues]
  | GlobalValues;
type BackgroundSize = string | GlobalValues;

interface BackgroundWithoutSize {
  attachment?: BackgroundAttachment;
  clip?: BackgroundClip;
  color?: BackgroundColor;
  image?: BackgroundImage;
  origin?: BackgroundOrigin;
  position?: BackgroundSize;
  repeat?: BackgroundRepeat;
}

type BackgroundWithSize = Omit<BackgroundWithoutSize, 'position'> & {
  position: BackgroundPosition;
  size?: BackgroundSize;
};

type BackgroundOptions = BackgroundWithoutSize | BackgroundWithSize;

function isBackgroundWithSize(
  background: BackgroundOptions,
): background is BackgroundWithSize {
  return 'size' in background;
}

function backgroundOptionsToString(options: BackgroundOptions): string {
  let position;
  if (isBackgroundWithSize(options) && options.size) {
    position = `${options.position}/${options.size}`;
  } else {
    position = options.position;
  }

  return [
    options.image,
    position,
    options.repeat,
    options.origin,
    options.clip,
    options.attachment,
    options.color,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Note: Color can only be defined on the last background,
 * https://developer.mozilla.org/en-US/docs/Web/CSS/background
 * TODO: Implement this check by types in Typescript 4.2 (by [...options, lastOptions])
 */
export function background(
  value: 'none' | BackgroundOptions | BackgroundOptions[],
): string {
  if (value === 'none') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(backgroundOptionsToString).join(', ');
  }

  return backgroundOptionsToString(value);
}
