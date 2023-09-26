import type { Credentials, Role, User } from "../model/auth";

import axios from 'axios';
import type { AxiosError } from 'axios';
import { validateUser } from "../validator/userValidator";

export const login = async function(credentials: Credentials): Promise<string> {
    try {
        const response = await axios.post(process.env.BACK_URL + '/api/login/', credentials);
        console.log(response)
        return response.data.token;
    } catch (e) {
        if ((e as AxiosError).response?.status === 401) {
            throw new Error('Your email or password combination is incorrect');
        }else if ((e as AxiosError).response?.status === 500){
            throw new Error('Internal Server Error')
        }
        console.error((e as Error).message);
        throw new Error('Could not login')
    }

}

export const register = async function(user: User): Promise<void> {
    const error: string = validateUser(user)

    if (error) {
        throw new Error(error)
    }

    try {
        await axios.post(process.env.BACK_URL + '/api/register/', user);
    } catch (e) {
        throw new Error('Failed to register');
    }
}

export const getRoles = async function():Promise<Role[]>{
    try {
        const response = await axios.get(process.env.BACK_URL + '/api/authRoles/');
        console.log(response.data);
        return response.data as Role[]
    } catch (e) {
        throw new Error('Failed to register');
    }
}

export const whoami = async function(token: string): Promise<User> {
    console.log(token)
    try {
        console.log(`Bearer ${token}`)
        const response = await axios.get(process.env.BACK_URL + "/api/whoami", {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (response.status === 200) {
            return response.data as User
        }
    } catch (e) {
        if ((e as AxiosError).response?.status === 401) {
            throw new Error("User isn't logged in")
        }
        console.log((e as Error).message);

    }
    throw new Error("Couldn't get user")
}