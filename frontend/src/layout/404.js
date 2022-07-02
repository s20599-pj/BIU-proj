import {Link} from "react-router-dom";

export default function NotFound() {
    return(
        <center>
            Wszedleś na błędną stronę<br />
            <Link to={"/"}>Kliknij tutaj aby przejść do strony głównej</Link>
        </center>
    )
}