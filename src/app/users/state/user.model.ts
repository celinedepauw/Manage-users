export interface User {
  _id:string;
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  phoneNumber: string,
  age?: string,
  sex?: string
}

export function createUser(params: Partial<User>) {
  return {

  } as User;
}
