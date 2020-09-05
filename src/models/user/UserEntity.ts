export class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    picture?: string;
    spaceId?: string;
    phone?: string;
    isActive: boolean;
    createdAt: string;
}
