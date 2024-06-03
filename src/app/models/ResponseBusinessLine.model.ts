
  export interface ResponseBusinessLine {
    ok: boolean
    data: Data
  }
  
  export interface Data {
    data: BusinessLine[]
    total: number
  }
  
  export interface BusinessLine {
    uuid: string
    name: string
    createdAt: string
    updatedAt: string
  }