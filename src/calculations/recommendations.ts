export function gerarRecomendacoes(irp: number): string[] {
  if (irp >= 0.00 && irp <= 0.25) {
    return [
      "Manter monitoramento operacional padrão.",
      "Seguir inspeção rotineira."
    ];
  } else if (irp > 0.25 && irp <= 0.50) {
    return [
      "Programar inspeção preventiva.",
      "Verificar pressão, temperatura e condição da pista.",
      "Acompanhar evolução do trecho."
    ];
  } else if (irp > 0.50 && irp <= 0.75) {
    return [
      "Reduzir velocidade média.",
      "Realizar inspeção prioritária dos pneus.",
      "Verificar fragmentos rochosos, irregularidades e cortes.",
      "Avaliar manutenção da haul road."
    ];
  } else {
    return [
      "Acionar alerta operacional.",
      "Recomendar inspeção imediata.",
      "Avaliar retirada preventiva do equipamento.",
      "Corrigir trecho crítico da via.",
      "Revisar carga, velocidade, pressão e condição térmica."
    ];
  }
}

export function gerarAlertasEspecificos(tkphnBruto: number, tkphCalculadoAlgumAlerta: boolean, sgn: number, cpn: number, ien: number, san: number, pan: number): string[] {
  const alertas: string[] = [];

  if (tkphnBruto >= 0.8 && tkphnBruto <= 1) alertas.push("Alerta de solicitação térmica elevada.");
  if (tkphnBruto > 1) alertas.push("Alerta de operação acima do limite térmico admissível.");
  if (sgn >= 0.75) alertas.push("Alerta de severidade geológico-geotécnica elevada.");
  if (cpn >= 0.70) alertas.push("Alerta de risco elevado de cortes e perfurações.");
  if (ien >= 0.70) alertas.push("Alerta de risco elevado de impactos e separações estruturais.");
  if (san >= 0.70) alertas.push("Alerta de superaquecimento adicional relevante.");
  if (pan >= 0.70) alertas.push("Alerta de patinagem significativa.");

  return alertas;
}
