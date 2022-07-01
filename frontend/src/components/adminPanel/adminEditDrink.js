import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {useGlobalContext} from "../../globalFunctions";
import {Link, useParams} from "react-router-dom";
import {coctailGlass, coctailType} from "../../utility/coctailDetailData"

export default function EditDrink(){
    const {coctailId} = useParams();
    const {getSpecificCoctail, saveCoctails} = useGlobalContext();
    const {register, handleSubmit} = useForm();
    const [tempIngredients, setTempIngredients] = useState([]);

    const tempCoctail = getSpecificCoctail(parseInt(coctailId));

    useEffect(() => {
        if (tempCoctail !== undefined) {
            setTempIngredients([...tempCoctail.ingredients]);
        }
    })

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
        <div className={"editDrink"}>
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
                <div>Rodzaj szkła: <select {...register('glass')} defaultValue={tempCoctail.glass} required>
                    <option disabled defaultValue={tempCoctail.glass} selected />
                    {coctailGlass.map((type, key) => {
                        return(
                            <option key={key} defaultValue={type}>{type}</option>
                        )
                    })
                    }
                </select> </div>
                <div>
                    Składniki:
                    {tempIngredients.map((ingredient, key) => {
                        return(
                            <>
                                <input type={"text"} defaultValue={ingredient.amount} required />
                                <input type={"text"} defaultValue={ingredient.counter} required />
                                <input type={"text"} defaultValue={ingredient.name} required /><br/>
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