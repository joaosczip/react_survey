export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`Campo ${field} inválido`);
    this.name = 'InvalidFieldError';
  }
}
