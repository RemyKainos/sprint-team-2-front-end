import type { ActiveSession, Credentials } from "../model/auth";

import axios from 'axios';
import type { AxiosError } from 'axios';

export const login = async function(credentials: Credentials): Promise<ActiveSession> {
    try {
        const response = await axios.post('http://' + process.env.BACK_URL + '/api/login/', credentials);


        return response.data;
    } catch (e) {
        if ((e as AxiosError).response?.status === 401) {
            throw new Error('Your email or password combination is incorrect');
        }else if ((e as AxiosError).response?.status === 500){
            throw new Error('Internal Server Error')
        }
        throw new Error('Could not login')
    }

}
