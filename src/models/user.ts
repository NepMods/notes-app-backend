export interface UserWithoutToken {
    email: string;
    username: string;
    password: string;
}

export interface UserWithToken {
    email: string;
    username: string;
    password: string;
    token: string;
}

export interface UserWithoutPassword {
    email: string;
}
