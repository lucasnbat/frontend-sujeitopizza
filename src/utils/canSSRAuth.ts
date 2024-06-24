import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from 'next';

//para pegar nosso cookie
import {
    parseCookies,
    destroyCookie
} from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

// funçõa para paginas que só users logados podem acessar

export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@COAportal.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/', //tela de login
                    permanent: false,
                }
            }
        }

        try {
            return await fn(ctx); // deixa seguir
        } catch (err) { //deu algum erro
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, '@COAportal.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }

                }
            }

            // Adicione um console.error para outros erros não esperados
            console.error("Unexpected error:", err);
        }


        // Redirecionamento padrão para login em caso de erro inesperado
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
}

