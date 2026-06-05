import { IRPCalculation } from '../types';

export const MATERIALS = [
  { id: 'hematita', label: 'Hematita Compacta', abrasividade: 6.5, severity: 5.38 },
  { id: 'esteril', label: 'Estéril Compacto', abrasividade: 4.2, severity: 3.50 },
  { id: 'canga', label: 'Canga Semi-Silicosa', abrasividade: 8.8, severity: 7.90 },
  { id: 'quartzo', label: 'ItabiritoQuartzoso', abrasividade: 5.8, severity: 4.80 }
];

export const TRACKS = [
  { id: 'rampa_sul', label: 'S11D - Rampa Sul', baseSeverity: 1.0, criticalSector: 'SEG-B2' },
  { id: 'rampa_norte', label: 'S11D - Rampa Norte', baseSeverity: 0.85, criticalSector: 'SEG-A3' },
  { id: 'acesso_leste', label: 'S11D - Acesso Leste', baseSeverity: 0.70, criticalSector: 'SEG-D1' }
];

export function calculateIRP(
  carga: number,
  velocidade: number,
  materialId: string,
  trackId: string,
  cp: number, // Cortes / Perfurações
  ie: number, // Impactos / Separação
  so: number, // Superaquecimento
  pt: number  // Patinagem
): IRPCalculation {
  // 1. TKPH Calculation
  // Bruto TKPH = Carga * Velocidade
  const tkph = carga * velocidade;
  const tkphLimit = 960; // Limite teórico pneu OTR
  const tkphNorm = Math.min(tkph / tkphLimit, 1.0);
  const tkphParc = tkphNorm * 0.25;

  // 2. Severity (SG) Calculation based on selected material and track multiplier
  const material = MATERIALS.find(m => m.id === materialId) || MATERIALS[0];
  const track = TRACKS.find(t => t.id === trackId) || TRACKS[0];
  
  const sg = material.severity * track.baseSeverity;
  const sgNorm = Math.min(sg / 10, 1.0);
  const sgParc = sgNorm * 0.20;

  // 3. Sliders normalization
  const cpNorm = cp / 10;
  const cpParc = cpNorm * 0.20;

  const ieNorm = ie / 10;
  const ieParc = ieNorm * 0.20;

  const soNorm = so / 10;
  const soParc = soNorm * 0.10;

  const ptNorm = pt / 10;
  const ptParc = ptNorm * 0.05;

  // 4. Sum up weights
  const total = tkphParc + sgParc + cpParc + ieParc + soParc + ptParc;

  // Classify risk based on index
  let classificacao: IRPCalculation['classificacao'] = 'Baixo Risco';
  if (total >= 0.76) {
    classificacao = 'Risco Crítico';
  } else if (total >= 0.51) {
    classificacao = 'Alto Risco';
  } else if (total >= 0.26) {
    classificacao = 'Risco Moderado';
  }

  return {
    tkph,
    tkphNorm,
    tkphParc,
    sg,
    sgNorm,
    sgParc,
    cp,
    cpNorm,
    cpParc,
    ie,
    ieNorm,
    ieParc,
    so,
    soNorm,
    soParc,
    pt,
    ptNorm,
    ptParc,
    total,
    classificacao
  };
}
