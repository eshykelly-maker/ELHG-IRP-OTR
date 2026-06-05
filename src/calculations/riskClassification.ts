export interface RiskClassification {
  classificacao: string;
  cor: string;
  interpretacao: string;
}

export function classificarRisco(irp: number): RiskClassification {
  if (irp >= 0.00 && irp <= 0.25) {
    return { classificacao: "Baixo risco operacional", cor: "verde", interpretacao: "Operação dentro da normalidade." };
  } else if (irp > 0.25 && irp <= 0.50) {
    return { classificacao: "Risco moderado", cor: "amarelo", interpretacao: "Atenção a pontos de desgaste." };
  } else if (irp > 0.50 && irp <= 0.75) {
    return { classificacao: "Alto risco operacional", cor: "laranja", interpretacao: "Probabilidade elevada de falha precoce." };
  } else {
    return { classificacao: "Risco crítico operacional", cor: "vermelho", interpretacao: "Falha iminente, ação corretiva necessária." };
  }
}
