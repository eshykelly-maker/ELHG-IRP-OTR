export interface AtivoConfig {
  id: string;
  identificacao: string;
  pneuModelo: string;
  pneuPosicao: string;
  cargaMedia: number; // toneladas
  velocidade: number; // km/h
}

export interface FormulaRow {
  variable: string;
  label: string;
  bruto: number;
  norm: number;
  parc: number;
}

export interface MapLayer {
  viasAcesso: boolean;
  mineralogia: boolean;
  zonasAltoImpacto: boolean;
  analiseTematica: 'nenhum' | 'declividade' | 'geologia' | 'hipse';
  sateliteFundo: 'esri' | 'google';
}

export interface IRPCalculation {
  tkph: number;
  tkphNorm: number;
  tkphParc: number;
  
  sg: number;
  sgNorm: number;
  sgParc: number;
  
  cp: number;
  cpNorm: number;
  cpParc: number;
  
  ie: number;
  ieNorm: number;
  ieParc: number;
  
  so: number;
  soNorm: number;
  soParc: number;
  
  pt: number;
  ptNorm: number;
  ptParc: number;
  
  total: number;
  classificacao: 'Baixo Risco' | 'Risco Moderado' | 'Alto Risco' | 'Risco Crítico';
}
