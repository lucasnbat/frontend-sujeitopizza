import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../../public/logo-cooperativa-3.png';
import Image from 'next/image';
import { FiLogOut, FiPlus } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';

export function Header() {
    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image
                        src={logo}
                        width={60}
                        alt='logo'
                    />
                </Link>

                <nav className={styles.menuNav}>
                    <button className={styles.addButton}>
                        <FiPlus
                            color='#fff'
                            size={24}
                        />
                        Novo
                    </button>

                    <Link href='/department'>
                        <span>Departamentos</span>
                    </Link>

                    <Link href='/dashboard'>
                        <span>Dashboard</span>
                    </Link>

                    <Link href='/profile'>
                        <span>Meu Perfil</span>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut
                            color='#fff'
                            size={24}
                        />
                    </button>
                </nav>
            </div>
        </header>
    )
}