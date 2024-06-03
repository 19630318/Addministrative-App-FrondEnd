export interface ResponseBusiness {
  ok: boolean
  data: Data
}

export interface Data {
  data: Business[]
  totalPages: number
}

export interface Business {
  uuid: string
  name: string
  description: string
  rfc: string
  active: boolean
  createdAt: string
  updatedAt: string
  businessCategoryUuid: string
  businessLineUuid: string
}

