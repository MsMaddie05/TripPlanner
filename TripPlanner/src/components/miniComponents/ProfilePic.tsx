import styles from "./ProfilePic.module.css"

import img1 from "../../images/img1.jpg"
import img2 from "../../images/img2.jpg"
import img3 from "../../images/img3.jpg"
import img4 from "../../images/img4.jpg"
import img5 from "../../images/img5.jpg"
import img6 from "../../images/img6.jpg"

interface Props {
    size: number,
    imgName: "img1" | "img2" | "img3" | "img4" | "img5" | "img6",
}

export default function ProfilePic({size, imgName}:Props) {
    const imgMap = {
        "img1" : img1,
        "img2" : img2,
        "img3" : img3,
        "img4" : img4,
        "img5" : img5,
        "img6" : img6,
    }

    return (
        <img className={styles.circleImg} src={imgMap[imgName]} width={size} height={size}></img> 
    )

}