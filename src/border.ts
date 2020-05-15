import { px } from './values';

type BorderOptions = {
  width: number;
  type?: 'solid' | string;
  color: string;
};

export function border({ width, type = 'solid', color }: BorderOptions): string {
  return `${px(width)} ${type} ${color}`;
}
