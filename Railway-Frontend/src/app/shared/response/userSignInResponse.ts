import { Register } from "../models/registerUserSchema";

export class UserSignInResponse{
    message:string;
    token:string;
    userDetails:Register
}