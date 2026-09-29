export type CharOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 50;

const CHARSETS: Record<keyof CharOptions, string> = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%&*?-_=+',
};

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

export function clampLength(value: number): number {
  if (Number.isNaN(value)) return MIN_LENGTH;
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, value));
}

/**
 * Gera uma senha com o tamanho pedido usando apenas os tipos de caractere ativos.
 * Garante pelo menos um caractere de cada tipo selecionado.
 */
export function generatePassword(length: number, options: CharOptions): string {
  const activeSets = (Object.keys(CHARSETS) as (keyof CharOptions)[])
    .filter((key) => options[key])
    .map((key) => CHARSETS[key]);

  if (activeSets.length === 0) return '';

  const size = clampLength(length);
  const pool = activeSets.join('');
  const chars: string[] = activeSets.map((set) => set[randomIndex(set.length)]);

  while (chars.length < size) {
    chars.push(pool[randomIndex(pool.length)]);
  }

  // Embaralha (Fisher-Yates) para os caracteres obrigatórios não ficarem sempre no início
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, size).join('');
}
