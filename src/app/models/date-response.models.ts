export interface DateResponse {
    ok: boolean
    data: Data
  }
  
  export interface Data {
    currentDate: string
    dateNumber: number
  }