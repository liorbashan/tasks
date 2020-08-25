import { ILoginResponse } from './../models/ILoginResponse';
import { ILoginRequest } from './../models/ILoginRequest';
import { JsonController, Post } from 'routing-controllers';
// import jwt from 'jsonwebtoken';
// import { IJWTPayload } from '../models/IJWTPayload';
// import { User } from './../graphql/types/User';

@JsonController('/login')
export class LoginController {
    @Post('/')
    public async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
        // TODO: check user exists by comparing email and hashed password, if exists generate a token and send back
        return { errorCode: 0, jwt: '' };
    }

    // private generateJWT(user: User): string {
    //     const secret: string = process.env.JWT_SECRET as string;
    //     const payload: IJWTPayload = {
    //         iss: 'Tasks',
    //         iat: Math.floor(Date.now() / 1000),
    //         exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 60,
    //         name: user.name,
    //         userId: user.id,
    //         email: user.email,
    //         groups: user.groups,
    //     };
    //     const token: string = jwt.sign(payload, secret);
    //     return token;
    // }
}
