import React, {useState} from 'react';
import PropTypes from 'prop-types'
import Error from './Error';
import shortid from 'shortid'

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error1, guardarError1] = useState(false);
    const [error2, guardarError2] = useState(false)

    //cuando el usuario agrega un gasto
    const agregarGasto = e=>{
        e.preventDefault();

        //validar
        if (nombre.trim() === '') {
            guardarError1(true);
            return;
        }
        guardarError1(false);

        if(cantidad < 1 || isNaN(cantidad) ) {
            guardarError2(true);
            return;
        };
        guardarError2(false);
        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        };
        //pasar el gasto al componente principal
        guardarGasto(gasto)
        guardarCrearGasto(true)
        //resetear el form
        guardarNombre('');
        guardarCantidad(0);
    }
    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus Gastos</h2>
            { error1 ? <Error mensaje='Ambos campos son obligatorios'/>  : null }
            { error2 ? <Error mensaje='Presupuesto Incorrecto' /> :null}
            
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                type="text"
                className="u-full-width"
                placeholder="Ej. Transporte"
                value={nombre}
                onChange={e => guardarNombre (e.target.value, 10)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                type="number"
                className="u-full-width"
                placeholder="Ej. 300"
                value={cantidad}
                onChange={e => guardarCantidad ( parseInt(e.target.value ) )}
                />
            </div>
            <input 
            type="submit"
            className="u-full-width button-primary"
            value="Agregar Gasto"

            />

        </form>
     );
}
Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 

 
export default Formulario;