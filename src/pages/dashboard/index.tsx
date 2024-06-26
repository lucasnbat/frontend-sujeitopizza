import { Header } from "@/src/components/Header"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - COAPortal</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>

                    <div className={styles.containerHeader}>
                        <h1>Últimos holerites</h1>
                        <button>
                            <FiRefreshCcw color='#3fffa3' size={25} />
                        </button>
                    </div>

                    <article className={styles.listPayslips}>

                        <section className={styles.payslipItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Holerite 37289</span>
                            </button>
                        </section>
                        
                    </article>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})