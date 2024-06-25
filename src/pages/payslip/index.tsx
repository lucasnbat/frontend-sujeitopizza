import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '@/src/utils/canSSRAuth';

export default function Payslip() {
    return (
        <>
            <Head>
                <title>Novo holerite</title>
            </Head>

            <div>
                <h1>Tchain</h1>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})