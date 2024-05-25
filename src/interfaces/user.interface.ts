import { Request } from "express"

export interface UserI {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string
}

export interface RequestUserI extends Request {
  user?: UserI
}