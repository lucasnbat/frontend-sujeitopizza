import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

// tem contexto fornecido que será usado para extrair os cookies
export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:
        {
            Authorization: `Bearer ${cookies['@COAportal.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        // erro 401 -> deslogar user
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') { // se estiver no browser...
                signOut();
            } else {
                return Promise.reject(new AuthTokenError()); // se estiver no server...
            }
        }

        return Promise.reject(error); // se der qualquer outro erro (500,501...)
    })

    return api;

}