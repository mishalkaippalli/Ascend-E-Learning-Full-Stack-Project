export interface IPasswordResetTokenService {
  generateAndStore(userId: string): Promise<string>;
  consume(token: string): Promise<string>;
}