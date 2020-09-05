export interface IJWTPayload {
    firstName: string;
    lastName: string;
    picture?: string;
    phone?: string;
    id: string;
    email: string;
    emailVerified?: boolean;
    groups: string[];
}
