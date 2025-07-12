export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string
  ) {}

  static generateRandom(): User {
    const timestamp = Date.now();
    return new User(
      `user${timestamp}@test.com`,
      'P@ssw0rd123',
      'John',
      'Doe'
    );
  }
}