import { area } from './area';
import { background } from './background';
import { border } from './border';
import { boxShadow } from './boxShadow';
import { transition } from './transition';

export const enhancers = {
  background,
  border,
  boxShadow,
  margin: area,
  padding: area,
  transition,
};

export type Enhancers = typeof enhancers;
