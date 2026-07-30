import styles from "./Button.module.css"
import clsx from 'clsx';

interface props {
    theme: String,
    onClick: Function,
    children: React.ReactNode;
}

export default function Button({ theme, onClick, children }: props) {
    const onClicked = () => {
        onClick();
    }

    return (
        <button className={clsx(
        {[styles.darkBtn]: theme === "dark", [styles.lightBtn]: theme==="light", [styles.darkMediumBtn]: theme==="medium"})
        } type="submit" onClick={onClicked}>{children}</button>
    )
}