import crypt from 'bcryptjs';

/**
 * Gera um hash seguro para a senha informada usando bcrypt.
 * @param password - Senha em texto puro a ser criptografada.
 * @returns Promise que resolve para o hash da senha.
 */
export function hashPassword(password: string): Promise<string> {
  return crypt.hash(password, 8);
}

/**
 * Verifica se a senha informada corresponde ao hash armazenado.
 * @param password - Senha em texto puro fornecida pelo usuário.
 * @param hashedPassword - Hash da senha armazenado no banco de dados.
 * @returns Promise que resolve para true se a senha for válida, false caso contrário.
 */
export function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return crypt.compare(password, hashedPassword);
}
