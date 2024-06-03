export interface ResponseLogin {
    ok: boolean
    data: Data
  }
  
  export interface Data {
    uuid: string
    name: string
    lastname: string
    email: string
    password: string
    phone: string
    token: string
  }