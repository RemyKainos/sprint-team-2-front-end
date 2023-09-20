import axios from 'axios';
import { JobFamily } from '../model/JobFamily';

export const getFamilyByCapability = async function (id : number): Promise<JobFamily []> {
    try {
        const response = await axios.get("http://" + process.env.BACK_URL + '/api/view-families-by-capability/' + id)
        return response.data
    } catch (e) {
        throw new Error('Could not fetch family by capability')
    }
}