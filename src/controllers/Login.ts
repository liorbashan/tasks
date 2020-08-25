import { JWTPayload } from './../models/JWTPayload';
import { User } from './../graphql/types/User';
import { JsonController } from 'routing-controllers';
import jwt from 'jsonwebtoken';

@JsonController('/login')
export class LoginController {
    private generateJWT(user: User): string {
        const secret: string = process.env.JWT_SECRET as string;
        const payload: JWTPayload = {
            iss: 'Tasks',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 60,
            name: user.name,
            userId: user.id,
            email: user.email,
            groups: user.groups,
        };
        const token: string = jwt.sign(payload, secret);
        return token;
    }
}
