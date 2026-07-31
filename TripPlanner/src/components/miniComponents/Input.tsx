import styles from './Input.module.css'

interface inputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: Function;
}

export default function Input ({type, placeholder, value, onChange}: inputProps){
    
    return(
        <input className = {styles.inputs}  type = {type} id = {placeholder} placeholder = {placeholder} value = {value} onChange = {(e) => onChange(e.target.value)}></input>
    )
}