import { JobCapabilityRequest } from "../model/JobCapability";

export const isValidCapability = function (jobCapabilityRequest: JobCapabilityRequest): string {
    const capabilityName = jobCapabilityRequest.name as string

    if (capabilityName?.length > 70) {
        return 'Capability Name must be under 70 characters long'
    }

    return ''
}