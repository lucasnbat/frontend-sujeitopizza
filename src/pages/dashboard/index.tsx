import { Header } from "@/src/components/Header";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import Head from "next/head";
import styles from "./styles.module.scss";
import { FiEdit, FiRefreshCcw, FiSend, FiUpload } from "react-icons/fi";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { api } from "@/src/services/apiClient";

interface PublishReturn {
    id: string;
    observation: string;
    competenciaPublish: string;
}

export default function Dashboard() {
    const [publishes, setPublishes] = useState([]);

    useEffect(() => {
        async function loadPublishes() {
            const response = await api.get("/getAllPublishes");

            setPublishes(response.data);
        }

        loadPublishes();
    }, []);

    console.log(publishes)

    return (
        <>
            <Head>
                <title>Painel - COAPortal</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimas publicações</h1>
                        <button>
                            <FiRefreshCcw color="#3fffa3" size={25} />
                        </button>
                    </div>

                    <article className={styles.listPayslips}>
                        {/* <section className={styles.payslipItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>ID</span>
                                <span className={styles.spanStatus}>Status</span>
                                <span>Competência</span>

                                <span className={styles.actions}>
                                    <span>
                                        <Link href="/payslip">
                                            <FiEdit size={19} />
                                        </Link>
                                    </span>
                                    <span>
                                        <Link href="/payslip">
                                            <FiUpload size={19} />
                                        </Link>
                                    </span>

                                    <span>
                                        <FiSend size={19} />
                                    </span>
                                </span>
                            </button>
                        </section> */}
                        {publishes.map((publish: PublishReturn) => {
                            return (
                                <section key={publish.id} className={styles.payslipItem}>
                                    <button className={styles.buttonStyle}>
                                        <div className={styles.tag}></div>
                                        <span className={styles.spanIdStyle}>{publish.id}</span>
                                        <span className={styles.spanStatus}>
                                            Status
                                        </span>
                                        <span className={styles.competenciaStyle}>{publish.competenciaPublish}</span>

                                        <span className={styles.actions}>
                                            <span>
                                                <Link href="/payslip">
                                                    <FiEdit size={19} />
                                                </Link>
                                            </span>
                                            <span>
                                                <Link href="/payslip">
                                                    <FiUpload size={19} />
                                                </Link>
                                            </span>

                                            <span>
                                                <FiSend size={19} />
                                            </span>
                                        </span>
                                    </button>
                                </section>
                            );
                        })}
                    </article>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {},
    };
});
