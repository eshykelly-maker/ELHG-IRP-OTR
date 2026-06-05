export interface FMEAMode {
  modoFalha: string;
  sigla: string;
  s: number;
  o: number;
  d: number;
}

export const MODOS_FALHA: FMEAMode[] = [
  { sigla: "ST", modoFalha: "Superaquecimento e separação térmica", s: 10, o: 6, d: 7 },
  { sigla: "IE", modoFalha: "Impactos e separações estruturais", s: 9, o: 7, d: 5 },
  { sigla: "CP", modoFalha: "Cortes e perfurações", s: 8, o: 8, d: 4 },
  { sigla: "PT", modoFalha: "Patinagem e desgaste por deslizamento", s: 7, o: 7, d: 4 },
  { sigla: "AS", modoFalha: "Abrasão severa", s: 6, o: 7, d: 3 }
];
