import {NavLink} from "react-router-dom";
import {House, Plus} from 'react-bootstrap-icons'
import '../styles/layer.css'

export default function Navigation() {
    return(
        <div className={"navigation"}>
            <NavLink to={"/"} className={"link"}><House size={30} /></NavLink>
            <NavLink to={"/addCoctail"} className={"link"}><Plus size={30} /></NavLink>
        </div>
    )
}