import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {useGlobalContext} from "../../globalFunctions";
import {Link, useParams} from "react-router-dom";
import {coctailGlass, coctailType} from "../../utility/coctailDetailData"
import "../../styles/changeCoctail.css"

export default function AddDrink(){
    const {saveCoctails} = useGlobalContext();
    const {register, handleSubmit} = useForm();
    const [tempIngredients, setTempIngredients] = useState([{
        name: "",
        amount: "",
        counter: ""
    }]);

    const addNewIngredient = () => {
        const index = [...tempIngredients];
        index.push({
            name: "",
            amount: "",
            counter: ""
        })
        setTempIngredients(index);
    }

    const addDrink = (data, e) => {
        e.preventDefault();
        saveCoctails(data, false)
    }

    return(
        <div className={"addDrink"}>
            <form onSubmit={handleSubmit(addDrink)}>
                <div>Nazwa drinka: <input type={"text"} {...register('name')} required /></div>
                <div>Typ drinka: <select {...register('type')}  required>
                    <option disabled selected />
                    {coctailType.map((type, key) => {
                        return(
                            <option key={key} defaultValue={type}>{type}</option>
                        )
                     })
                    }
                </select> </div>
                <div>Rodzaj szkła:
                    <input type={"text"} {...register('glass')} required placeholder={"Podaj rodzaj szkła"} />
                </div>
                <div>
                    Składniki:
                    {tempIngredients.map((ingredient, key) => {
                        return(
                            <>
                                <input type={"text"} placeholder={"Nazwa"} {...register('nameIngr' + key)} required />
                                <input type={"text"} placeholder={"Ilość"} {...register('amount' + key)}  />
                                <input type={"text"} placeholder={"Miara"} {...register('counter' + key)}  /><br/>
                            </>
                        )
                    })
                    }
                    <button type={"button"} onClick={() => addNewIngredient()}>Dodaj nowy składnik</button>
                </div>
                <div>
                    Lista kroków:
                    <textarea {...register("steps")} rows={10} cols={75} required
                              placeholder={"Instrukcja sporządzenia drinka"} />
                </div>
                <div>
                    Zdjęcie:
                    <input type={"file"} {...register("image")} accept={"image/*"} />
                </div>
                <button type={"register btn btn-success"}
                        type={"submit"}>Dodaj drinka</button>
            </form>
            <Link to={"/"}>Powrot do strony glownej</Link>
        </div>
    )
}