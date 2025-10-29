export interface RDPAC {
  L: number;
  L_MULT: number;
  P: number;
  PL: number;
  K_START: number;
  K_END: number;
  K_INC: number;
}

export interface RDPACSettingsProps {
  settings: RDPAC;
  setSettings: (settings: RDPAC) => void;
}
