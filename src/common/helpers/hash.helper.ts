import * as bcrypt from 'bcrypt';

export class HashHelper {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    password: string,
    hashed: string,
  ): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await bcrypt.compare(password, hashed);
  }
}
