export class LoginRequest
{
    username!:string;
    password!:string;
}

export class LoginResponse
{
    status!:boolean;
    message!:string;
    content!:LoginInfo;
}
export class LoginInfo
{
    username!:string;
    email!:string;
    fullName!:string;
    accessToken!:string;
}