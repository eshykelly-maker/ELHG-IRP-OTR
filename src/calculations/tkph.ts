import { TKPH_ADMISSIVEL } from './constants';

export interface TKPHResult {
  cargaMediaPorPneu: number;
  velocidadeMedia: number;
  tkphCalculado: number;
  tkphAdmissivel: number;
  percentualUtilizacaoTermica: number;
  tkphnBruto: number;
  tkphnCalculo: number;
  alertas: string[];
}

export function calcularTKPH(cargaMediaPorPneu: number, velocidadeMedia: number): TKPHResult {
  const tkphCalculado = cargaMediaPorPneu * velocidadeMedia;
  const tkphnBruto = tkphCalculado / TKPH_ADMISSIVEL;
  const tkphnCalculo = Math.max(0, Math.min(tkphnBruto, 1));
  const percentualUtilizacaoTermica = tkphnBruto * 100;
  
  const alertas: string[] = [];
  if (tkphnBruto >= 0.8 && tkphnBruto <= 1) {
    alertas.push('Alerta de solicitação térmica elevada.');
  } else if (tkphnBruto > 1) {
    alertas.push('Alerta de operação acima do limite térmico admissível.');
  }

  return {
    cargaMediaPorPneu,
    velocidadeMedia,
    tkphCalculado,
    tkphAdmissivel: TKPH_ADMISSIVEL,
    percentualUtilizacaoTermica,
    tkphnBruto,
    tkphnCalculo,
    alertas
  };
}
