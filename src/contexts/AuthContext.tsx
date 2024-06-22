import Router from 'next/router';
import { destroyCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

// contexto em si
export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
    children: ReactNode; // aceita qualquer elemento filho do react, que está dentro
}

export function signOut() {
    try {
        // destroi o token do cookie
        destroyCookie(undefined, '@COAportal.token');

        // redireciona para a home
        Router.push('/');
    } catch (error) {
        console.log('Erro ao deslogar: ', error)
    }
}

// componente que vai prover as info e os metodos no global
export function AuthProvider({ children }: AuthProviderProps) {

    // estado do usuário (com id, nome, email...)
    const [user, setUser] = useState<UserProps>({ id: '', name: '', email: '' });
    
    // se o usuário existe, ele está autenticado, retorna true
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            console.log(email, password);

            const response = await api.post('/login', {
                email,
                password
            })

            console.log(response.data)
        } catch (error) {
            console.log('Erro ao logar: ', error)
        }
    }

    return (
        /* Abaixo significa que o provider vai rodear toda a aplicação para fornecer os valores globalmente */

        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}