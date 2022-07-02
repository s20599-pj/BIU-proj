import {NavLink} from "react-router-dom";
import {Circle, House, Plus} from 'react-bootstrap-icons'
import '../styles/layer.css'
import {useGlobalContext} from "../globalFunctions";

export default function Navigation() {
    const {admin} = useGlobalContext()

    const adminCheck = () => {
        if(!admin){
            return(
                <NavLink to={"/adminLogin"} className={"link"}><Circle size={30} /></NavLink>
            )
        }
        else{
            return (
                <NavLink to={"/addCoctail"} className={"link"}><Plus size={30} /></NavLink>
            )
        }
    }

    return(
        <div className={"navigation"}>
            <NavLink to={"/"} className={"link"}><House size={30} /></NavLink>
            {adminCheck()}
        </div>
    )
}