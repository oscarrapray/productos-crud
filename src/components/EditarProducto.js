import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../redux/actions/productoActions';
import { useHistory } from 'react-router-dom';


const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    // nuevo state de producto
    const [ producto, guardarProducto] = useState({
        nombre: '',
        precio: '' 
    })

    // producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
  
    // llenar el state automaticamente
    useEffect( () => {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    // Leer los datos del formulario
    const onChangeFormulario = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }


    const { nombre, precio} = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch( editarProductoAction(producto) );
    
        history.push('/');
    }

    return ( 
        <div className="form-product">
            <h2 className="title_form">Agregar un nuevo Producto</h2>
            <form  onSubmit={submitEditarProducto}>
                <div className="form_item">
                    <input type="text" className="name" id="name" 
                    name = "nombre"
                    value={nombre}
                    onChange={onChangeFormulario}
                    />
                    <label htmlFor="name">producto</label>
                </div>
                <div className="form_item">
                    <input type="text" className="name" id="precio"
                    name = "precio"
                    value={precio}
                    onChange={onChangeFormulario}
                    />
                    <label htmlFor="precio">precio</label>
                </div>
                <button className="btn btn_new">Guardar</button>
            </form>
        </div>
     );
}
 
export default EditarProducto;