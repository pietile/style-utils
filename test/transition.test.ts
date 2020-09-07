import { transition, cubicTransition } from '../src/transition';

describe('transition', () => {
  it('should return valid value', () => {
    expect(transition({ duration: '225ms', property: 'opacity' })).toBe(
      'opacity 225ms',
    );
    expect(
      transition({
        duration: '225ms',
        property: 'opacity',
        delay: '225ms',
        timingFunction: 'ease',
      }),
    ).toBe('opacity 225ms ease 225ms');
  });
});

describe('cubitTransition', () => {
  it('should return valid value', () => {
    expect(cubicTransition('opacity')).toBe(
      'opacity 235ms cubic-bezier(0.4, 0, 0.2, 1)',
    );
  });
});
