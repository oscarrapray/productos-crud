import axios from "axios";
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR, 
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from './types';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch({
            type: AGREGAR_PRODUCTO,
            payload: true
        });

        try {
            // insertar en la API
            await axios.post('http://localhost:4000/productos', producto);

            // Si todo sale bien, actualizar el state
           dispatch({
            type: AGREGAR_PRODUCTO_EXITO,
            payload: producto
           });

            // Alerta
            Swal.fire(
                'Correcto', 
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch({
                type: AGREGAR_PRODUCTO_ERROR,
                payload: true
            });

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch({
            type: COMENZAR_DESCARGA_PRODUCTOS,
            payload: true
        });

        try {
            const respuesta = await axios.get('http://localhost:4000/productos');
            dispatch({
                type: DESCARGA_PRODUCTOS_EXITO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: DESCARGA_PRODUCTOS_ERROR, 
                payload: true
            })
        }
    }
}


// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch({
            type: OBTENER_PRODUCTO_ELIMINAR,
            payload: id
        });

        try {
            await axios.delete(`http://localhost:4000/productos/${id}`);
            dispatch({
                type: PRODUCTO_ELIMINADO_EXITO
            });

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTO_ELIMINADO_ERROR,
                payload: true
            });
        }
    }
}


// Colocar producto en edición
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch({
            type: OBTENER_PRODUCTO_EDITAR,
            payload: producto
        })
    }
}

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch({
            type: COMENZAR_EDICION_PRODUCTO
        });

        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto);    
            dispatch({
                type: PRODUCTO_EDITADO_EXITO,
                payload: producto
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTO_EDITADO_ERROR,
                payload: true
            });
        }
    }
}