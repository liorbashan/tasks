export interface IJWTPayload {
    firstName: string;
    lastName: string;
    picture?: string;
    phone?: string;
    spaceId?: string;
    id: string;
    email: string;
    emailVerified?: boolean;
    groups: string[];
}
