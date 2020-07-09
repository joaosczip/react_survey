export class EmailAddressAlreadyInUseError extends Error {
  constructor() {
    super('Endereço de E-mail já está em uso.');
    this.name = 'EmailAddressAlreadyInUseError';
  }
}
