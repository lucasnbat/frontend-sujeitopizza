import Head from "next/head";
import styles from '../../styles/home.module.scss'
import Image from "next/image";
import logoImg from '../../public/logo-cooperativa-3.png';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>COAPortal - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>

        <Image className={styles.image} src={logoImg} alt="SujeitoPizza" />

        <div className={styles.login}>
          <form>
            <Input
              type="text"
              placeholder="Digite seu email"
            />

            <Input
              type="password"
              placeholder="Digite sua senha"
            />

            <Button
              type='submit'
              loading={false}

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
