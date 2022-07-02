import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {useGlobalContext} from "../../globalFunctions";
import {Link, useParams, Navigate} from "react-router-dom";
import {coctailGlass, coctailType} from "../../utility/coctailDetailData"


export default function EditDrink(){
    const {coctailId} = useParams();
    const {getSpecificCoctail, saveCoctails, admin} = useGlobalContext();
    const {register, handleSubmit} = useForm();
    const [tempIngredients, setTempIngredients] = useState([]);

    const tempCoctail = getSpecificCoctail(parseInt(coctailId));


    useEffect(() => {
        if (tempCoctail !== undefined) {
            setTempIngredients([...tempCoctail.ingredients]);
        }
    }, [])

    if(!admin){
        return (
            <Navigate to={"/"} />
        )
    }

    const changeDrink = (data, e) => {
        e.preventDefault();
        data.id = parseInt(coctailId)
        saveCoctails(data, true)
    }

    const addNewIngredient = () => {
        const index = [...tempIngredients];
        index.push({
            name: "",
            amount: "",
            counter: ""
        })
        setTempIngredients(index);
    }

    return(
        <div className={"addDrink"}>
            <form onSubmit={handleSubmit(changeDrink)}>
                <div>Nazwa drinka: <input type={"text"} {...register('name')} defaultValue={tempCoctail.name} required /></div>
                <div>Typ drinka: <select {...register('type')} defaultValue={tempCoctail.type} required>
                    <option disabled defaultValue={tempCoctail.type} selected />
                    {coctailType.map((type, key) => {
                        return(
                            <option key={key} defaultValue={type}>{type}</option>
                        )
                     })
                    }
                </select> </div>
                <div>Rodzaj szkła:
                    <input type={"text"} {...register('glass')} required placeholder={"Podaj rodzaj szkła"} defaultValue={tempCoctail.glass}/>
                </div>
                <div>
                    Składniki:<br />
                    {tempIngredients.map((ingredient, key) => {
                        return(
                            <>
                                <input type={"text"} placeholder={"Nazwa"} {...register('nameIngr' + key)} defaultValue={ingredient.name} required />
                                <input type={"text"} placeholder={"Ilość"} {...register('amount' + key)} defaultValue={ingredient.amount} />
                                <input type={"text"} placeholder={"Miara"} {...register('counter' + key)} defaultValue={ingredient.counter} /><br/>
                            </>
                        )
                    })
                    }
                    <button type={"button"} onClick={() => addNewIngredient()}>Dodaj nowy składnik</button>
                </div>
                <div>
                    Lista kroków:
                    <textarea {...register("steps")} rows={10} cols={75} required
                              defaultValue={tempCoctail.steps.join('')} />
                </div>
                <div>
                    Zdjęcie:
                    <input type={"file"} {...register("image")} accept={"image/*"} />
                </div>
                <button type={"register btn btn-success"}
                        type={"submit"}>Zmień drinka</button>

            </form>
            <Link to={"/"}>Powrot do strony glownej</Link>
        </div>
    )
}