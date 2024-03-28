export const roleList = ['USER', 'ADMIN', 'PROFESSIONAL', 'SUPPORT'] as const;

export enum Role {
    admin = 'ADMIN',
    user = 'USER',
    professional = 'PROFESSIONAL',
    support = 'SUPPORT'
}