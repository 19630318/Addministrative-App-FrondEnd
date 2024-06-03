export interface User {
    uiid: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}

export interface UserCreateDto {    
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}