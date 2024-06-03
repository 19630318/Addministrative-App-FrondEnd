export interface ResponseCategoriesBusiness {
  ok: boolean
  data: Data
}
  
export interface Data {
  data: CategorieBusines[]
  total: number
}
  
export interface CategorieBusines {
  uuid: string
  name: string
  createdAt: string
  updatedAt: string
}  
