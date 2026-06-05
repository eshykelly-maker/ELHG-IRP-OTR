import { calcularIRPOTR } from '../calculations/irpOtr';
import { CENARIOS_SIMULADOS } from '../data/scenarios';
import { MODOS_FALHA } from '../data/fmeaBase';
import { calcularFMEA, posicionarMatrizSO } from '../calculations/fmea';
import { gerarParetoFMEA } from '../calculations/pareto';

export function runAllSimulations() {
  console.log("=== INICIANDO TESTES DO MODELO IRP-OTR (DADOS SIMULADOS) ===");
  
  const fmeaResultados = calcularFMEA(MODOS_FALHA);
  const paretoData = gerarParetoFMEA(fmeaResultados);
  const matrizData = posicionarMatrizSO(fmeaResultados);

  console.log("FMEA CALCULADO:", fmeaResultados);
  console.log("PARETO:", paretoData);
  console.log("MATRIZ S x O:", matrizData);

  const irpBaixo = calcularIRPOTR(CENARIOS_SIMULADOS.BAIXO);
  console.log("CENÁRIO BAIXO:", irpBaixo);

  const irpModerado = calcularIRPOTR(CENARIOS_SIMULADOS.MODERADO);
  console.log("CENÁRIO MODERADO:", irpModerado);

  const irpAlto = calcularIRPOTR(CENARIOS_SIMULADOS.ALTO);
  console.log("CENÁRIO ALTO:", irpAlto);

  return {
    fmea: {
      resultados: fmeaResultados,
      pareto: paretoData,
      matriz: matrizData
    },
    cenarios: {
      baixo: irpBaixo,
      moderado: irpModerado,
      alto: irpAlto
    }
  };
}
