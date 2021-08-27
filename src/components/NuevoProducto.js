import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// Actions de Redux
import { crearNuevoProductoAction } from '../redux/actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../redux/actions/alertaActions';

const NuevoProductos = ({history}) => {

// state del componente
const [product, setProduct] = useState({
    id: '',
    nombre: '',
    precio: 0
});

const { id,nombre,precio } = product;

const actualizarState = e => {
    product.id = uuidv4();
    setProduct({
        ...product,
        [e.target.name]: e.target.value 
    })
}

// utilizar use dispatch y te crea una función
const dispatch = useDispatch();

// Acceder al state del store
const cargando = useSelector( state => state.productos.loading );
const error = useSelector(state => state.productos.error);
const alerta = useSelector(state => state.alerta.alerta);

// mandar llamar el action de productoAction
const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

// cuando el usuario haga submit
const submitNuevoProducto = e => {
    e.preventDefault();

    // validar formulario
    if(nombre.trim() === '' || precio <= 0) {

        const alerta = {
            msg: 'Ambos campos son obligatorios',
            classes: 'alert alert-danger text-center text-uppercase p3'
        }
        dispatch( mostrarAlerta(alerta) );

        return;
    }

    // si no hay errores
    dispatch( ocultarAlertaAction() );

    // crear el nuevo producto

    agregarProducto({
        id,
        nombre,
        precio
    });

    // redireccionar
    history.push('/');
}

    return ( 
        <div className="form-product">
        <h2 className="title_form">Agregar un nuevo Producto</h2>
        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null }
        <form onSubmit={submitNuevoProducto}>
            <div className="form_item">
                <input type="text" className="name" id="name" 
                name = "nombre"
                value={nombre}
                onChange={actualizarState}
                />
                <label htmlFor="name">producto</label>
            </div>
            <div className="form_item">
                <input type="text" className="name" id="precio"
                name = "precio"
                value={precio}
                onChange={actualizarState}
                />
                <label htmlFor="precio">precio</label>
            </div>
            <button className="btn btn_new">Guardar</button>
        </form>
        { cargando ? <p>Cargando...</p> : null }
                        
        { error ? <p className = "error">Hubo un error</p> : null }
    </div>
     );
}
 
export default NuevoProductos;