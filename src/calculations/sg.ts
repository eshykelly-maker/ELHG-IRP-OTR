import { normalizarNota } from './normalization';

export interface SGCriteria {
  litologia: number;
  fragmentacao: number;
  umidade: number;
  declividade: number;
  irregularidade: number;
}

export interface SGResult {
  criterios: SGCriteria;
  sgFinal: number;
  sgn: number;
  classificacao: string;
}

export function calcularSG(criterios: SGCriteria | number): SGResult {
  let sgFinal: number;
  let criteriosUsados: SGCriteria;

  if (typeof criterios === 'number') {
    sgFinal = criterios;
    criteriosUsados = {
      litologia: criterios,
      fragmentacao: criterios,
      umidade: criterios,
      declividade: criterios,
      irregularidade: criterios
    };
  } else {
    sgFinal = (criterios.litologia + criterios.fragmentacao + criterios.umidade + criterios.declividade + criterios.irregularidade) / 5;
    criteriosUsados = criterios;
  }

  const { valorNormalizado: sgn } = normalizarNota(sgFinal);

  let classificacao = "";
  if (sgFinal >= 0 && sgFinal <= 2.5) {
    classificacao = "baixa severidade";
  } else if (sgFinal > 2.5 && sgFinal <= 5.0) {
    classificacao = "severidade moderada";
  } else if (sgFinal > 5.0 && sgFinal <= 7.5) {
    classificacao = "alta severidade";
  } else if (sgFinal > 7.5 && sgFinal <= 10) {
    classificacao = "severidade crítica";
  } else {
    classificacao = "valor fora do intervalo (0-10)";
  }

  return {
    criterios: criteriosUsados,
    sgFinal,
    sgn,
    classificacao
  };
}
