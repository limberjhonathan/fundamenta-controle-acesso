/**
 * Erro de regra de negócio com mensagem pronta para o usuário.
 *
 * `field` indica qual campo do formulário causou o erro (quando houver),
 * permitindo que a tela mostre a mensagem embaixo do input certo.
 */
export class AppError<TField extends string = string> extends Error {
  readonly field?: TField;

  constructor(message: string, field?: TField) {
    super(message);
    this.name = 'AppError';
    this.field = field;
  }
}

export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado. Tente novamente.'): string {
  if (error instanceof AppError) return error.message;
  return fallback;
}
