import React, {useContext, useState} from 'react'
import {ModalContext} from '../context/ModalContext'

//Modal MaterialUI import
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'

//Modal MaterialUI posicionamiento en pantalla
const getModalStyle = () => {
    const top = 50 
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    }
}

//Modal MaterialUI Styles
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 350,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 600,
        display: 'block'
      },
    header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
    },
    content: {
        padding: "12px 0",
        overflow: 'scroll'
    }
}))

const Receta = ({receta}) => {

    //Config Modal
    const [modalStyle] = useState(getModalStyle)
    const [open, saveOpen] = useState(false)

    const classes = useStyles()

    const handleOpen = () => {
        saveOpen(true)
    }

    const handleClose = () => {
        saveOpen(false)
    }

    const {infoReceta, guardarReceta, guardarIdReceta} = useContext(ModalContext)

    const mostrarIngredientes = infoReceta => {
        let ingredientes = []
        for(let i = 1; i < 16; i++) {
            if(infoReceta[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{infoReceta[`strIngredient${i}`]} {infoReceta[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes
    }

    return (
        <div className='col-md-4 mb-3'>
            <div className='card'>
                <h2 className='card-header'>{receta.strDrink}</h2>

                <img className='card-img-top' src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />

                <div className='card-body'>
                    <button 
                        type='button' 
                        className='btn btn-block btn-primary'
                        onClick={() => {
                            guardarIdReceta(receta.idDrink)
                            handleOpen()
                        }}
                        >
                        Ver Receta
                    </button>

                    <Modal 
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null)
                            guardarReceta({})
                            handleClose()
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoReceta.strDrink}</h2>
                            <h3 className='mt-4'> Instrucciones</h3>
                            <p>{infoReceta.strInstructions}</p>

                            <img className='img-fluid my-4' src={infoReceta.strDrinkThumb} alt='' />

                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(infoReceta)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
 
export default Receta