import styles from './styles.module.scss';
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// config de tipagem do input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

// pega todas as prop no ...rest e passa para o input

// graças a essa config. você pode passar qualquer valor de propriedade
// de input para o componente

export function Input({ ...rest }: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    );
}

export function Textarea({ ...rest }: TextareaProps) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    );
}