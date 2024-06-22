import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo-cooperativa-3.png';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === ''){
            alert ('Preencha todos os campos');
            return;
        }

        setLoading(true);
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>

                <Image className={styles.image} src={logoImg} alt="SujeitoPizza" />

                <div className={styles.login}>
                    <h1>Crie sua conta</h1>

                    <form onSubmit={handleSignUp}>
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            type="text"
                            placeholder="Digite seu email corporativo"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <Button
                            type='submit'
                            loading={loading}

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
