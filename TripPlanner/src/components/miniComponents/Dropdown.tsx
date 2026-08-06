import styles from "./Dropdown.module.css"
import clsx from "clsx";
import {useState} from "react";


interface props {
    setter: Function,
    options : Array<{name: string, id: string}>
    name: string,
    closes: boolean,
}

export default function Dropdown({setter, options, name, closes}: props) {
    const [showList, setShowList] = useState(false);
    const [dropdownName, setDropdownName] = useState(name);
    const onClickViewOptions = () => {
        setShowList(!showList);
    }
    
    const onClickOption = (element: {name: string, id: string}) => {
        setter(element.id);
        setDropdownName(element.name);
        if (closes) {
            setShowList(false);
        }
    }

    return (
        <div className = {styles.dropDownContainer}>
            <div id = {styles.viewOptionsContainer} onClick = {onClickViewOptions}>{dropdownName}</div>
            <div className = {clsx(styles.listContainer, {[styles.hidden]: !showList})}>
                {options.map(
                    (element) => <li className = {styles.listItem} onClick = {()=>onClickOption(element)}>{element.name}</li>
                    )
                }
            </div>
        </div>
    )
}