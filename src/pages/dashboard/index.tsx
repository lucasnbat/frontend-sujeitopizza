import { Header } from "@/src/components/Header"
import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Painel - COAPortal</title>
            </Head>

            <div>
                <Header />

                <h1>Painel</h1>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})