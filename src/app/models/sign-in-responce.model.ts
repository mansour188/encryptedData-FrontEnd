import { User } from "./user.model";

export class SignInResponce {
    user:User
    token:string
    constructor(user:User,token:string){
        this.token=token
        this.user=user

    }
}
