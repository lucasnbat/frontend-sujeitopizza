import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
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

// componente que vai prover as info e os metodos no global
export function AuthProvider({ children }: AuthProviderProps) {

    // estado do usuário (com id, nome, email...)
    const [user, setUser] = useState<UserProps>({ id: '', name: '', email: ''});

    // se o usuário existe, ele está autenticado, retorna true
    const isAuthenticated = !!user;

    async function signIn() {
        alert('signIn')
    }

    return (
        /* Abaixo significa que o provider vai rodear toda a aplicação para fornecer os valores globalmente */

        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}