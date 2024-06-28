import styles from "./styles.module.scss";
import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// config de tipagem do input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

// Adiciona a tipagem para o select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { }

// pega todas as prop no ...rest e passa para o input

// graças a essa config. você pode passar qualquer valor de propriedade
// de input para o componente

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export function Textarea({ ...rest }: TextareaProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}

// Cria um novo componente Select
export function Select({ ...rest }: SelectProps) {
  return <select className={styles.select} {...rest}></select>;
}
