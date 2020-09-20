import { AddUserInput } from './../graphql/types/User';
import { IAuthProviderUser } from './../models/IAuthProviderUser';
import { IUserRepository } from './../interfaces/IUserRepository';
import { Container } from 'typedi';
import { UserEntity } from './../models/user/UserEntity';
import { IJWTPayload } from './../models/IJWTPayload';
import { logger } from './../utils/Logger';
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import jwt, { SignOptions } from 'jsonwebtoken';

@JsonController('/auth')
export class LoginController {
    constructor(private userService: IUserRepository) {
        this.userService = Container.get('UserService');
    }

    @Post('/callback')
    public async saveUser(@Body() data: IAuthProviderUser): Promise<string> {
        logger.info(data);
        let userEntity: UserEntity | null | void = null;
        let token = '';
        // Lookup user by Email, if not exists, create and return it.
        userEntity = await this.userService.get({ email: data.email }).catch((error) => {
            logger.warn('Fetch user from database: ', error);
        });
        if (!userEntity) {
            // Add user to repo
            const newUserData: Partial<AddUserInput> = {
                email: data.email,
                firstName: data.given_name,
                lastName: data.family_name,
                emailVerified: data.verified_email,
                picture: data.picture,
            };
            userEntity = await this.userService.add(newUserData).catch((error) => {
                logger.warn('Fetch user from database: ', error);
                throw new BadRequestError(error.message);
            });
        }
        if (userEntity) {
            token = this.generateJWT(userEntity);
        }
        return token;
    }

    private generateJWT(user: UserEntity): string {
        const secret: string = process.env.JWT_SECRET as string;
        let expirationPeriodInSeconds = 2592000; // 60 * 60 * 24 * 30 = 30 Days in seconds
        try {
            expirationPeriodInSeconds = Number(process.env.TOKEN_EXPIRATION_SECONDS as string);
        } catch (error) {
            logger.warn(`Failed to parse token expiration number: ${error.message}`);
        }
        const payload: IJWTPayload = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            email: user.email,
            spaceId: user.spaceId,
            emailVerified: user.emailVerified,
            groups: [],
            picture: user.picture,
        };
        const options: SignOptions = {
            expiresIn: expirationPeriodInSeconds,
            algorithm: 'HS256',
            issuer: 'Tasks',
            subject: 'Tasks User',
        };
        const token: string = jwt.sign(payload, secret, options);
        return token;
    }
}
