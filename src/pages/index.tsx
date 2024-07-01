import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";
import logoImg from "../../public/logo-cooperativa-3.png";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

// trabalhando com server side props
import { GetServerSideProps } from "next";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  // estados
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // contexto
  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (userEmail === "" || userPassword === "") {
      toast.warning("Preencha todos os campos");
      return;
    }

    console.log(userEmail, userPassword);

    setLoading(true);

    await signIn({ userEmail, userPassword });

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
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Digite sua senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href="/signup">
            Não possui uma conta? Cadastre-se!
          </Link>
        </div>
      </div>
    </>
  );
}

// Primeiro passa por aqui antes de renderizar tudo que está em cima
// Se o user tentar acessar o login estando logado, vai ir pra dashboard (canSSRGuest faz isso)
export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
