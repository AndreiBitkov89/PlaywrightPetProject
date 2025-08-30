import { faker } from "@faker-js/faker";

export class User {
  constructor(
    public email: string | null,
    public password: string | null,
    public firstName: string | null,
    public lastName: string | null,
  ) {}

  static generateRandomUser(): User {
    return new User(
      faker.internet.email(),
      faker.internet.password(),
      faker.person.firstName(),
      faker.person.lastName(),
    );
  }

  static generateWithEmptyFields(fieldsToNullify: Array<keyof User>): User {
    const data: Record<keyof User, string | null> = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };

    for (const field of fieldsToNullify) {
      data[field] = null;
    }

    return new User(data.email, data.password, data.firstName, data.lastName);
  }

  static generateUserWithInvalidEmail(): User {
    return new User(
      faker.internet.email() + "asd",
      faker.internet.password(),
      faker.person.firstName(),
      faker.person.lastName(),
    );
  }
}
