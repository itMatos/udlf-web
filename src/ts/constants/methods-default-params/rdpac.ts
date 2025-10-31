import type { RDPAC } from '@/ts/types/methods/rdpac';

export const RDPAC_DEFAULT_PARAMS: RDPAC = {
  L: 400,
  P: 0.75,
  PL: 0.97,
  K_START: 1,
  K_END: 15,
  K_INC: 1,
  L_MULT: 2,
} as const;
