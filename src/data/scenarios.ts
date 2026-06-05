import { IRPInputData } from '../calculations/irpOtr';

export const CENARIO_BAIXO_RISCO: IRPInputData = {
  cargaMediaPorPneu: 35,
  velocidadeMedia: 9.5,
  sg: 2.0,
  cp: 1.5,
  ie: 1.5,
  sa: 2.0,
  pa: 1.0
};

export const CENARIO_MODERADO_RISCO: IRPInputData = {
  cargaMediaPorPneu: 45,
  velocidadeMedia: 12.0,
  sg: 4.5,
  cp: 3.0,
  ie: 3.5,
  sa: 3.5,
  pa: 2.5
};

export const CENARIO_ALTO_RISCO: IRPInputData = {
  cargaMediaPorPneu: 55,
  velocidadeMedia: 14.5,
  sg: 7.0,
  cp: 6.5,
  ie: 7.5,
  sa: 4.0,
  pa: 2.0
};

export const CENARIOS_SIMULADOS = {
  BAIXO: CENARIO_BAIXO_RISCO,
  MODERADO: CENARIO_MODERADO_RISCO,
  ALTO: CENARIO_ALTO_RISCO
};
