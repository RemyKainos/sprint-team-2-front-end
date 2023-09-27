export type Credentials = {
    username: string;
    password: string;
}

export type User = {
    username: string;
    password: string;
    role: string;
}

export type ActiveSession = {
    token: string;
    username: string;
    role: string;
}

export type Role = {
    roleID: number
    roleName: string    
}

