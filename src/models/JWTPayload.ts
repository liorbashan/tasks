export interface JWTPayload {
    iss: string;
    iat: string;
    exp: number;
    name: string;
    userId: string;
    email: string;
    groups: string[];
}
