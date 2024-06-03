export interface Boss {
    uiid: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}

export interface BossCreateDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
}