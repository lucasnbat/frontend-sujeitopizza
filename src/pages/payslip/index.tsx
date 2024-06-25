import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { Header } from '@/src/components/Header';
import { FiUpload } from 'react-icons/fi';

export default function Payslip() {
    return (
        <>
            <Head>
                <title>Novo holerite</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo holerite</h1>

                    <form className={styles.form}>

                        <select>
                            <option>
                                Funcionário 1
                            </option>
                            <option>
                                Funcionário 2
                            </option>
                        </select>

                        <label className={styles.labelDoc}>
                            <span>
                                <FiUpload
                                    size={25}
                                    color='#fff'
                                />
                            </span>
                            <input
                                type="file"
                                accept=".pdf, .docx, .odt"
                            />
                        </label>

                        <input
                            type="text"
                            placeholder="Digite a competência do holerite"
                            className={styles.input}
                        />

                        <textarea
                            placeholder="Adicione uma observação"
                            className={styles.input}
                        />

                        <button
                            className={styles.buttonAdd}
                            type="submit"
                        >
                            Enviar
                        </button>


                    </form>
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