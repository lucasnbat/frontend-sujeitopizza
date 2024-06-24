import Head from "next/head";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';
import styles2 from '../../components/ui/input/styles.module.scss'
import logoImg from '../../../public/logo-cooperativa-3.png';
import { Input, Select } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/apiClient";
import { toast } from "react-toastify";

interface Department {
    id: string,
    departmentName: string,
}

export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        async function fetchDepartments() {
            try {
                const response = await api.get('/departments'); // Busca os departamentos
                setDepartments(response.data); // Armazena os departamentos no estado
            } catch (error) {
                console.log('Erro ao buscar departamentos: ', error);
            }
        }

        fetchDepartments();
    }, []);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '' || departmentId === '') {
            toast.warning('Preencha todos os campos');
            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password,
            departmentId,
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro!</title>
            </Head>
            <div className={styles.containerCenter}>

                <Image className={styles.image} src={logoImg} alt="SujeitoPizza" />

                <div className={styles.login}>
                    <h1>Crie sua conta</h1>

                    <form onSubmit={handleSignUp}>
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            type="text"
                            placeholder="Digite seu email corporativo"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />

                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        {/* <Input
                            type="text"
                            placeholder="Digite o ID do seu departamento"
                            value={departmentId}
                            onChange={(e) => { setDepartmentId(e.target.value) }}
                        /> */}

                        <Select 
                            
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                        >
                            <option value="" disabled>Selecione seu departamento</option>
                            {departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.departmentName}
                                </option>
                            ))}
                        </Select>

                        <Button
                            type='submit'
                            loading={loading}

                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link className={styles.text} href="/">
                        Já possui uma conta? Faça login!
                    </Link>

                </div>
            </div>
        </>
    );
}
