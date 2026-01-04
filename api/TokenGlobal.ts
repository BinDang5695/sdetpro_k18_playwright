// settings/globals/TokenGlobal.ts
export class TokenGlobal {
  static TOKEN: string;

  static getBearerToken(): string {
    return `Bearer ${this.TOKEN}`;
  }
}
