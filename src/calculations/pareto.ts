import { FMEAResult } from './fmea';

export interface ParetoItem {
  sigla: string;
  modoFalha: string;
  rpn: number;
  percentual: number;
  percentualAcumulado: number;
}

export function gerarParetoFMEA(fmeaOrdenado: FMEAResult[]): ParetoItem[] {
  const somaTotalRPN = fmeaOrdenado.reduce((acc, curr) => acc + curr.rpn, 0);
  let acumulado = 0;

  return fmeaOrdenado.map(item => {
    const percentual = (item.rpn / somaTotalRPN) * 100;
    acumulado += percentual;

    return {
      sigla: item.sigla,
      modoFalha: item.modoFalha,
      rpn: item.rpn,
      percentual,
      percentualAcumulado: acumulado
    };
  });
}
