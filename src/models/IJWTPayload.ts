export interface IJWTPayload {
    iss: string;
    iat: number;
    exp: number;
    name: string;
    userId: string;
    email: string;
    groups: string[];
}
