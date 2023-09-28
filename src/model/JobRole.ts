import { type } from "os"

export type JobRoleViewRoles = {
    roleID: number
    roleName: string
    sharepointLink: string
    bandName: string
    capabilityName: string
}

export type JobRoleFilter = {
    roleNameFilter: string
    bandID: number
    capabilityID: number
}