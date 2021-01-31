import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

//Crear el Context. Este sistema permite pasar los props directamente al componente padre sin pasar por todos los hijos.
export const CategoriasContext = createContext()

//Crear el provider, que es de donde salen los datos y las funciones
const CategoriasProvider = (props) => {

    //crear el state del Context
    const [categorias, guardarCategorias] = useState([])

    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`

            const categorias = await axios.get(url)

            guardarCategorias(categorias.data.drinks)
        }
        obtenerCategorias()

    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider