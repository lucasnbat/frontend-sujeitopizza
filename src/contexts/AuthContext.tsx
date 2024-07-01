import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
    id: string;
    userName: string;
    userEmail: string;
};

type SignInProps = {
    userEmail: string;
    userPassword: string;
};

type SignUpProps = {
    userName: string;
    userEmail: string;
    userPassword: string;
    departmentId: string;
};

// contexto em si
export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
    children: ReactNode; // aceita qualquer elemento filho do react, que está dentro
};

export function signOut() {
    try {
        // destroi o token do cookie
        destroyCookie(undefined, "@COAportal.token");

        // redireciona para a home
        Router.push("/");
    } catch (error) {
        console.log("Erro ao deslogar: ", error);
    }
}

// componente que vai prover as info e os metodos no global
export function AuthProvider({ children }: AuthProviderProps) {
    // estado do usuário (com id, nome, email...)
    const [user, setUser] = useState<UserProps>({ id: "", userName: "", userEmail: "" });

    // se o usuário existe, ele está autenticado, retorna true
    const isAuthenticated = !!user;

    useEffect(() => {
        // tentar pegar algo do cookie
        const { "@COAportal.token": token } = parseCookies();

        if (token) {
            // se o token estiver fraudado, o isAuthenticated da api vai apitar e fazer cair no catch
            api
                .get("/me")
                .then((response) => {
                    const { id, userName, userEmail } = response.data;

                    setUser({
                        id,
                        userName,
                        userEmail,
                    });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    async function signIn({ userEmail, userPassword }: SignInProps) {
        try {
            console.log(userEmail, userPassword);

            const response = await api.post("/login", {
                userEmail,
                userPassword,
            });

            const { id, userName, token } = response.data;

            setCookie(undefined, "@COAportal.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days para expirar
                path: "/", // quais caminhos (no caso todos) que acessam o cookie
            });

            // seta o usuário
            setUser({ id, userName, userEmail });

            // passar o token para todas as requisições
            api.defaults.headers["Authorization"] = `Bearer ${token}`;

            toast.success("Logado com sucesso!");

            // redireciona para o dashboard
            Router.push("/dashboard");
        } catch (error) {
            toast.error("Opa! Erro ao acessar");

            console.log("Erro ao logar: ", error);
        }
    }

    async function signUp({ userName, userEmail, userPassword, departmentId }: SignUpProps) {
        try {
            const response = await api.post("/users", {
                userName,
                userEmail,
                userPassword,
                departmentId,
            });

            toast.success("Cadastrado com sucesso!");

            Router.push("/");
        } catch (error) { }
    }

    return (
        /* Abaixo significa que o provider vai rodear toda a aplicação para fornecer os valores globalmente */

        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                signOut,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
