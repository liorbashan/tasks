import { IAuthProviderUser } from './../models/IAuthProviderUser';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Container } from 'typedi';
import { UserEntity } from './../models/user/UserEntity';
import { IJWTPayload } from './../models/IJWTPayload';
import { logger } from './../utils/Logger';
import { JsonController, Get, Post, Res, Body } from 'routing-controllers';
import path from 'path';

@JsonController('/auth')
export class LoginController {
    constructor(private userService: IUserRepository) {
        this.userService = Container.get('UserService');
    }

    @Get('/login')
    public login(@Res() res: any): any {
        const file = path.join(__dirname, '../', '/public/login.html');
        res.render(file);
    }
    @Post('/callback')
    public async saveUser(@Body() data: IAuthProviderUser): Promise<string> {
        logger.info(data);
        // todo: lookup user by ID, if not exists, create and return it.
        const userEntity: UserEntity | null | void = await this.userService.get({ email: data.email }).catch((error) => {
            logger.warn('Fetch user from database: ', error);
        });
        if (!userEntity) {
            // Add user to repo
            await this.userService.add({
                id: data.id,
                email: data.email,
                emailVerified: data.verified_email,
                firstName: data.given_name,
                lastName: data.family_name,
                picture: data.picture,
            });
        } else {
            const token: string = this.generateJWT(userEntity);
            return token;
        }
    }

    private generateJWT(user: UserEntity): string {
        const secret: string = process.env.JWT_SECRET as string;
        const payload: IJWTPayload = {
            iss: 'Tasks',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 60,
            givenName: user.firstName,
            lastName: user.lastName,
            userId: user.id,
            email: user.email,
            picture: user.picture,
            groups: user.groups,
        };
        const token: string = jwt.sign(payload, secret);
        return token;
    }
}
