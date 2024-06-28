import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Header } from "@/src/components/Header";
import { FiCheckCircle, FiUpload } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/src/services/api";

type PayslipProps = {
  status: boolean;
  observation: string;
  competenciaPayslips: string;
};

type ItemProps = {
  id: string;
  userName: string;
  userEmail: string;
  department: string | string[];
  payslip: PayslipProps[];
};

interface UserListProps {
  userList: ItemProps[];
}

export default function Payslip({ userList }: UserListProps) {
  const [docUrl, setDocUrl] = useState(""); // url da foto
  const [docFile, setDocFile] = useState<File | null>(null); // foto em si
  const [users, setUsers] = useState(userList || []);
  const [userSelected, setUserSelected] = useState<number>(0);
  const [competenciaPayslips, setCompetenciaPayslips] = useState("");
  const [observation, setObservation] = useState("");

  console.log(users[userSelected].id);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    if (!e.target.files) return;

    const doc = e.target.files[0];

    if (!doc) return;

    // pode adicionar validação de tipo de doc aqui

    setDocFile(doc);
    setDocUrl(URL.createObjectURL(e.target.files[0]));

    toast.success("Arquivo anexado!");
  }

  function handleChangeUserSelected(event: ChangeEvent<HTMLSelectElement>) {
    setUserSelected(Number(event.target.value));
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData(); //cria multipartFormData

      if (
        observation === "" ||
        competenciaPayslips === "" ||
        docFile === null ||
        userSelected === null
      ) {
        toast.error("Preencha todos os campos!");
        return;
      }

      data.append("observation", observation);
      data.append("competenciaPayslips", competenciaPayslips);
      data.append("userId", users[userSelected].id);
      data.append("file", docFile);

      const apiClient = setupAPIClient();
      await apiClient.post("/payslips", data);

      toast.success("Holerite cadastrado com sucesso!");

      setObservation("");
      setCompetenciaPayslips("");
      setUserSelected(0);
    } catch (err) {
      console.log(err);

      toast.error("Erro ao cadastrar!");
    }
  }

  return (
    <>
      <Head>
        <title>Nova publicação</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>Nova publicação</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <select value={userSelected} onChange={handleChangeUserSelected}>
              <option value="" disabled>
                Selecione um usuário
              </option>
              {users.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.userName}
                  </option>
                );
              })}
            </select>

            <label className={styles.labelDoc}>
              <span>
                {docFile ? (
                  <div>
                    <FiCheckCircle size={25} color="#fff" />
                    <div>Anexado</div>
                  </div>
                ) : (
                  <div>
                    <FiUpload size={25} color="#fff" />
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
              value={competenciaPayslips}
              onChange={(e) => setCompetenciaPayslips(e.target.value)}
            />

            <textarea
              placeholder="Adicione uma observação"
              className={styles.input}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Enviar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/users");

  console.log(response.data);

  return {
    // envia como propriedade
    props: {
      userList: response.data,
    },
  };
});
