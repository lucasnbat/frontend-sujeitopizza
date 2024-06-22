import Head from "next/head";
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../../public/logo-cooperativa-3.png';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  // estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // contexto
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);

    await signIn({ email, password });

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>COAPortal - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>

        <Image className={styles.image} src={logoImg} alt="SujeitoPizza" />

        <div className={styles.login}>

          <h1>Bem vindo ao COAPortal!</h1>

          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type='submit'
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href='/signup'>
            Não possui uma conta? Cadastre-se!
          </Link>

        </div>
      </div>
    </>
  );
}
