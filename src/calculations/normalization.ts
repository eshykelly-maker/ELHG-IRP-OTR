export interface NormalizationResult {
  valorOriginal: number;
  valorLimitado: number;
  valorNormalizado: number;
  aviso?: string;
}

export function normalizarNota(valorDe0a10: number): NormalizationResult {
  let valorLimitado = valorDe0a10;
  let aviso;

  if (valorDe0a10 < 0) {
    valorLimitado = 0;
    aviso = "Valor inserido menor que 0. Ajustado para 0.";
  } else if (valorDe0a10 > 10) {
    valorLimitado = 10;
    aviso = "Valor inserido maior que 10. Ajustado para 10.";
  }

  return {
    valorOriginal: valorDe0a10,
    valorLimitado,
    valorNormalizado: valorLimitado / 10,
    aviso
  };
}
