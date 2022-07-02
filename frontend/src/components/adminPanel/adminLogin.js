import React from 'react'
import {useForm} from "react-hook-form";
import {useGlobalContext} from "../../globalFunctions";
import {Navigate} from 'react-router-dom'
import '../../styles/layer.css'

export default function AdminLogin(){
    const {register, handleSubmit} = useForm();
    const {admin, setAdmin} = useGlobalContext()

    if(admin)
        return (<Navigate to={"/"} />)

    const login = (data) => {
        const sendCredentials = {
            login: data.login,
            password: data.password
        }
        console.log(sendCredentials)
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        fetch('http://localhost:3001/api/login', requestOptions)
            .then(response => response.json()
                .then(data => {
                    let error = document.getElementById("loginError");
                    if (data) {
                        error.innerText = '';
                        setAdmin(data);
                    } else {
                        error.innerText = "Nieprawidlowy login lub haslo";
                    }
                }))
    }

    return(

        <div className={"adminLogin"}>
            <form onSubmit={handleSubmit(login)}>
                <div id={"loginError"} />
                <input type={"text"} {...register("login")} placeholder={"login"} required /><br/>
                <input type={"text"} {...register("password")} placeholder={"password"} required /><br/>
                <button type={"register btn btn-success"}
                        type={"submit"}>Zaloguj się</button>
            </form>
        </div>
    )
}