import { Header } from "@/src/components/Header"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'
import { FiEdit, FiRefreshCcw, FiSend } from "react-icons/fi"

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
                                <span>Id</span>
                                <span>Status</span>
                                <span>Competência</span>
                                <span className={styles.spanColaborador}>Colaborador</span>
                                <span className={styles.actions}>
                                    <span>
                                        <FiEdit size={19} />
                                    </span>
                                    <span>
                                        <FiSend size={19} />
                                    </span>
                                </span>
                            </button>
                        </section>
                        <section className={styles.payslipItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Id</span>
                                <span>Status</span>
                                <span>Competência</span>
                                <span className={styles.spanColaborador}>Colaborador</span>
                                <span className={styles.actions}>
                                    <span>
                                        <FiEdit size={19} />
                                    </span>
                                    <span>
                                        <FiSend size={19} />
                                    </span>
                                </span>
                            </button>
                        </section>
                        <section className={styles.payslipItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Id</span>
                                <span>Status</span>
                                <span>Competência</span>
                                <span className={styles.spanColaborador}>Colaborador</span>
                                <span className={styles.actions}>
                                    <span>
                                        <FiEdit size={19} />
                                    </span>
                                    <span>
                                        <FiSend size={19} />
                                    </span>
                                </span>
                            </button>
                        </section>
                        <section className={styles.payslipItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Id</span>
                                <span>Status</span>
                                <span>Competência</span>
                                <span className={styles.spanColaborador}>Colaborador</span>
                                <span className={styles.actions}>
                                    <span>
                                        <FiEdit size={19} />
                                    </span>
                                    <span>
                                        <FiSend size={19} />
                                    </span>
                                </span>
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