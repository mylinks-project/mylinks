export type ExtendedUser = DefaultSession['user'] & {
    username: string;
    bio?: stirng;
    isOAuth: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}