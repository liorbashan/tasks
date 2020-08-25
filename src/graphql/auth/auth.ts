import { Context } from './../../models/Context';
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        throw new Error('Not authenticated');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.SECRET_JWT_KEY as string);
        // console.log(payload);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error(`Not authenticated - ${err.message}`);
    }
    return next();
};

export const validateGroup = (groups: string[], names: string[]) => {
    return names.some((x) => groups.includes(x));
};
