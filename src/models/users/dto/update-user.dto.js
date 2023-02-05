import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class UpdateUserDTO {
  age;
  name;
  phoneNumber;
  email;
  password;

  constructor(user) {
    this.age = user.age ?? undefined;
    this.name = user.name ?? undefined;
    this.phoneNumber = user.phoneNumber ?? undefined;
    this.email = user.email ?? undefined;
    this.password = user.password ?? undefined;
  }

  async updatePassword() {
    this.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
  }
}
