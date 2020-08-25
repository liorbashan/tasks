import { JWTPayload } from './../models/JWTPayload';
import { User } from './../graphql/types/User';
import { JsonController } from 'routing-controllers';
//import * as jwt from 'jsonwebtoken';

@JsonController('/login')
export class LoginController {
    private async generateJWT(user: User): string {
        const secret: string = process.env.JWT_SECRET;
        const payload: JWTPayload = {
            iss: 'Tasks',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 60,
            name: user.name,
            userId: user.id,
            email: user.email,
            groups: user.groups,
        };
        const token = jwt;
    }
}
