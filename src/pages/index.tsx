import Head from "next/head";
import styles from '../../styles/Home.module.scss';
import Image from "next/image";
import logoImg from '../../public/logo.svg';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="SujeitoPizza" />

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
        </div>
      </div>
    </>
  );
}
