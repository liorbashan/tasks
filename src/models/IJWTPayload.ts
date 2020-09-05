export interface IJWTPayload {
    iss: string;
    iat: number;
    exp: number;
    givenName: string;
    familyName: string;
    picture: string;
    userId: string;
    email: string;
    emailVerified: boolean;
    groups: string[];
}
