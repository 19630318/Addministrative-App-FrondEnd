export interface Business{
    uuid?: string
    name: string
    description: string
    rfc: string
    active?: boolean
    createdAt?: string
    updatedAt?: string
    businessCategoryUuid: string
    businessLineUuid: string
}