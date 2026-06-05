import { PESOS } from './constants';
import { calcularTKPH } from './tkph';
import { calcularSG } from './sg';
import { normalizarNota } from './normalization';
import { classificarRisco } from './riskClassification';
import { gerarRecomendacoes, gerarAlertasEspecificos } from './recommendations';
import { calcularFMEA, posicionarMatrizSO } from './fmea';
import { gerarParetoFMEA } from './pareto';
import { MODOS_FALHA } from '../data/fmeaBase';

export interface IRPInputData {
  cargaMediaPorPneu: number;
  velocidadeMedia: number;
  sg: number; // Ou objeto de critérios
  cp: number;
  ie: number;
  sa: number;
  pa: number;
}

export function calcularIRPOTR(data: IRPInputData) {
  // 1. Cálculos base
  const tkphRes = calcularTKPH(data.cargaMediaPorPneu, data.velocidadeMedia);
  const sgRes = calcularSG(data.sg);
  
  const cpnRes = normalizarNota(data.cp);
  const ienRes = normalizarNota(data.ie);
  const sanRes = normalizarNota(data.sa);
  const panRes = normalizarNota(data.pa);

  // 2. Variáveis normalizadas
  const tkphn = tkphRes.tkphnCalculo;
  const sgn = sgRes.sgn;
  const cpn = cpnRes.valorNormalizado;
  const ien = ienRes.valorNormalizado;
  const san = sanRes.valorNormalizado;
  const pan = panRes.valorNormalizado;

  // 3. Resultados parciais
  const parcialTKPH = tkphn * PESOS.TKPH;
  const parcialSG = sgn * PESOS.SG;
  const parcialCP = cpn * PESOS.CP;
  const parcialIE = ien * PESOS.IE;
  const parcialSA = san * PESOS.SA;
  const parcialPA = pan * PESOS.PA;

  // 4. Soma IRP-OTR
  const irpOtrFinal = parcialTKPH + parcialSG + parcialCP + parcialIE + parcialSA + parcialPA;

  // 5. Classificação e Alertas
  const classificacao = classificarRisco(irpOtrFinal);
  const alertasEspecificos = gerarAlertasEspecificos(tkphRes.tkphnBruto, tkphRes.alertas.length > 0, sgn, cpn, ien, san, pan);
  const recomendacoes = gerarRecomendacoes(irpOtrFinal);

  // Combine unique warnings
  const setAlertas = new Set([...tkphRes.alertas, ...alertasEspecificos]);

  // FMEA e Pareto (dados dependentes do modelo geral, podem ser estáticos do banco, mas compõe a resposta final)
  const fmeaCalc = calcularFMEA(MODOS_FALHA);
  const paretoData = gerarParetoFMEA(fmeaCalc);
  const matrizData = posicionarMatrizSO(fmeaCalc);

  return {
    dadosEntrada: data,
    valoresBrutos: {
      tkphCalculado: tkphRes.tkphCalculado,
      sgFinal: sgRes.sgFinal,
      cp: cpnRes.valorLimitado,
      ie: ienRes.valorLimitado,
      sa: sanRes.valorLimitado,
      pa: panRes.valorLimitado
    },
    valoresNormalizados: {
      tkphnBruto: tkphRes.tkphnBruto,
      tkphn,
      sgn,
      cpn,
      ien,
      san,
      pan
    },
    pesos: PESOS,
    resultadosParciais: {
      tkph: parcialTKPH,
      sg: parcialSG,
      cp: parcialCP,
      ie: parcialIE,
      sa: parcialSA,
      pa: parcialPA
    },
    irpOtrFinal,
    classificacaoRisco: classificacao.classificacao,
    corClassificacao: classificacao.cor,
    interpretacao: classificacao.interpretacao,
    alertas: Array.from(setAlertas),
    recomendacoes,
    dadosFMEA: fmeaCalc,
    dadosPareto: paretoData,
    dadosMatrizSO: matrizData,
    _notaDeDemonstracao: "Dados e modelo IRP-OTR baseados em parâmetros do TCC de referência (simulados)."
  };
}
