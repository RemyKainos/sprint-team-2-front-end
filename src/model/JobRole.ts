export type JobRoleViewRoles = {
    roleID: number
    roleName: string
    jobSpec?: string
    responsibilities?: string
    sharepointLink: string
    bandName: string
    capabilityName: string
}

export type JobRoleFilter = {
    roleNameFilter: string
    bandID: number
    capabilityID: number
}