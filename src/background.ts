/* eslint-disable no-shadow */
import { GlobalValues } from './types';

type BackgroundRepeatValues = 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat';

type BackgroundAttachment = 'scroll' | 'fixed' | 'local' | GlobalValues;
type BackgroundClip = 'border-box' | 'padding-box' | 'content-box' | 'text' | GlobalValues;
type BackgroundColor = string | GlobalValues;
type BackgroundImage = string;
type BackgroundOrigin = 'border-box' | 'padding-box' | 'content-box' | GlobalValues;
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

type Background = BackgroundWithoutSize | BackgroundWithSize;

function isBackgroundWithSize(background: Background): background is BackgroundWithSize {
  return 'size' in background;
}

/**
 * Creates a `background` shorthand value.
 * Note: Color can only be defined on the last background,
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background
 */
export function background(...backgrounds: Background[]): string {
  return backgrounds
    .map((background) => {
      let position;
      if (isBackgroundWithSize(background) && background.size) {
        position = `${background.position}/${background.size}`;
      } else {
        position = background.position;
      }

      return [
        background.image,
        position,
        background.repeat,
        background.origin,
        background.clip,
        background.attachment,
        background.color,
      ]
        .filter(Boolean)
        .join(' ');
    })
    .join(', ');
}
