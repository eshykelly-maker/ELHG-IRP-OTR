import { FMEAMode } from '../data/fmeaBase';

export interface FMEAResult extends FMEAMode {
  rpn: number;
}

export function calcularFMEA(modos: FMEAMode[]): FMEAResult[] {
  const resultados = modos.map(modo => ({
    ...modo,
    rpn: modo.s * modo.o * modo.d
  }));

  // Ordenar decrescente por RPN
  resultados.sort((a, b) => b.rpn - a.rpn);

  return resultados;
}

export interface FMEAMatrixPosition {
  sigla: string;
  s: number;
  o: number;
  rpn: number;
  classeRiscoVisual: string;
  tooltip: string;
}

export function posicionarMatrizSO(modos: FMEAResult[]): FMEAMatrixPosition[] {
  return modos.map(modo => {
    let classeRiscoVisual = "Baixo";
    if (modo.rpn >= 200) classeRiscoVisual = "Crítico";
    else if (modo.rpn >= 100) classeRiscoVisual = "Alto";
    else if (modo.rpn >= 50) classeRiscoVisual = "Moderado";

    // Aqui se pode refinar a classificação visual baseada na matriz real de FMEA se necessário (S vs O)
    // No TCC comum: S>=8 e O>=7 -> Crítico etc. Usando RPN como guia simples aqui:
    if (modo.s >= 8 && modo.o >= 7) classeRiscoVisual = "Crítico";
    else if (modo.s >= 6 && modo.o >= 6) classeRiscoVisual = "Alto";
    else if (modo.s >= 4 && modo.o >= 4) classeRiscoVisual = "Moderado";

    return {
      sigla: modo.sigla,
      s: modo.s,
      o: modo.o,
      rpn: modo.rpn,
      classeRiscoVisual,
      tooltip: `[${modo.sigla}] ${modo.modoFalha}: S=${modo.s}, O=${modo.o}, RPN=${modo.rpn}`
    };
  });
}
