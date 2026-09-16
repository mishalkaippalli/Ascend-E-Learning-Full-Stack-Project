export interface IRefreshTokenHasher {
  hash(token: string): string;

  verify(token: string, hashedToken: string): boolean;
}
