import { Header } from '@/src/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss'
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '@/src/services/api';
import { toast } from 'react-toastify';
import { canSSRAuth } from '@/src/utils/canSSRAuth';

export default function Department() {
    const [departmentName, setDepartmentName] = useState('');

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (departmentName === '') return;

        const apiClient = setupAPIClient();
        await apiClient.post('/departments', {
            departmentName: departmentName
        });

        toast.success('Departamento cadastrado com sucesso!');
        setDepartmentName('');


    }

    return (
        <>
            <Head>
                <title>Novo departamento</title>
            </Head>

            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Cadastro de setores</h1>

                    <form className={styles.form}
                        onSubmit={handleRegister}
                    >
                        <input
                            type='text'
                            placeholder='Digite o nome do setor'
                            className={styles.input}
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                        />


                        <button type='submit' className={styles.buttonAdd}>
                            Cadastrar
                        </button>
                    </form>
                </main>

            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {

        }
    }
})