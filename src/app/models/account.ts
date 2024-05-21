export interface AccountCreate {
    username: string;
    password: string;
    email: string;
    fullname?: string;
}

export interface AccountLogin {
    username: string;
    password: string;
}

export interface AccountProfile {
    applicationUserId: number;
    username: string;
    fullname: string;
    email: string;
    token: string;
}