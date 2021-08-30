export class UserModel {
  constructor(
    public id: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public dateOfCreate: string,
    public roleName: string
  ) {}
}
