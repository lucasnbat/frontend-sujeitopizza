import Head from 'next/head';
import styles from './styles.module.scss';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { Header } from '@/src/components/Header';
import { FiCheckCircle, FiUpload } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';

type PayslipProps = {
    status: boolean;
    observation: string;
    competenciaPayslips: string;
}

type ItemProps = {
    id: string;
    userName: string;
    userEmail: string;
    department: string | string[];
    payslip: PayslipProps[];
}

interface UserListProps {
    userList: ItemProps[]
}

export default function Payslip({ userList }: UserListProps) {
    const [docUrl, setDocUrl] = useState(''); // url da foto
    const [docFile, setDocFile] = useState<File | null>(null); // foto em si
    const [users, setUsers] = useState(userList || []);
    const [userSelected, setUserSelected] = useState();

    console.log(userList);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);

        if (!e.target.files) return;

        const doc = e.target.files[0];

        if (!doc) return;

        // pode adicionar validação de tipo de doc aqui

        setDocFile(doc)
        setDocUrl(URL.createObjectURL(e.target.files[0]))

        toast.success('Arquivo anexado!');
    }

    function handleChangeCategory(event: ChangeEvent<HTMLSelectElement>) {
        // console.log('teste')
        console.log(event.target.value);
    }

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

                        <select value={userSelected} onChange={handleChangeCategory}>
                            {users.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.userName}
                                    </option>
                                )
                            })}
                        </select>

                        <label className={styles.labelDoc}>
                            <span>
                                {docFile ? (
                                    <div>
                                        <FiCheckCircle
                                            size={25}
                                            color='#fff'
                                        />
                                        <div>Anexado</div>
                                    </div>
                                ) : (
                                    <div>
                                        <FiUpload
                                            size={25}
                                            color='#fff'
                                        />
                                        <div>Insira um arquivo</div>
                                    </div>
                                )}

                            </span>

                            <input
                                type="file"
                                accept=".pdf, .docx, .odt"
                                // value={docFile}
                                onChange={handleFile}
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

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/users');

    console.log(response.data);

    return {
        // envia como propriedade
        props: {
            userList: response.data
        }
    }
});