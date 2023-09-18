import { ActiveSession, Credentials, User } from "../model/auth";

import axios, { AxiosError } from 'axios'

export const login = async function(credentials: Credentials): Promise<ActiveSession> {
    try {
        const response = await axios.post('http://localhost:8080/api/login/', credentials);


        return response.data;
    } catch (e) {
        if ((e as AxiosError).response?.status === 401) {
            throw new Error('Your email or password combination is incorrect');
        }
        throw new Error('Could not login')
    }

}
