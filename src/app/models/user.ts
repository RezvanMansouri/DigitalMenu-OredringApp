export class User {
  id: number = -1;
  firstName: string = "";
  lastName: string = "";
  email: string ="";
  password: string = "";
  phone: number = 0;
  zipcode: string ="";


  constructor(firstName?: string, lastName?: string, email?: string, password?: string, confirmPassword?: string,
  phone?: number, zipcode?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
   // this.confirmPassword = confirmPassword;
    this.phone = phone;
    this.zipcode = zipcode;
  }
}
