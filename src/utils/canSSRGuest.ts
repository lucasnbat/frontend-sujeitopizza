import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from 'next';

//para pegar nosso cookie
import { parseCookies } from 'nookies';

//função para paginas que só visitantes (nao logados) podem acessar
export function canSSRGuest<P extends { [key: string]: any }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // se usuario já tem cookie, já ta logado
        if (cookies['@COAportal.token']){
            return {
                redirect: {
                    destination: '/dashboard', // redireciona para dashboard
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}