export class UserDTO {
  id;
  age;
  name;
  phoneNumber;
  email;

  constructor(user) {
    this.id = user.id;
    this.age = user.age;
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
  }
}
