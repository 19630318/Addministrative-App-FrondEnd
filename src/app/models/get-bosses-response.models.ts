export interface ResponseBosses {
    ok: boolean
    data: Data
  }
  
  export interface Data {
    data: Bosses[]
    total: number
  }
  
  export interface Bosses {
    uuid: string
    name: string
    lastname: string
    email: string
    password: string
    phone: string
    active: boolean
    verified: boolean
    createdAt: string
    updatedAt: string
  }