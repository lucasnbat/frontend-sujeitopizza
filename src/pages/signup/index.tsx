import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo-cooperativa-3.png';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Faça seu cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>

                <Image className={styles.image} src={logoImg} alt="SujeitoPizza" />

                <div className={styles.login}>
                    <h1>Crie sua conta</h1>

                    <form>
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                        />

                        <Input
                            type="text"
                            placeholder="Digite seu email corporativo"
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                        />

                        <Button
                            type='submit'
                            loading={false}

                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link className={styles.text} href="/">
                        Já possui uma conta? Faça login!
                    </Link>

                </div>
            </div>
        </>
    );
}
