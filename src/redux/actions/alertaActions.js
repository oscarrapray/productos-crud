import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from './types';

// Muestra alerta
export function mostrarAlerta(alerta) {
    return (dispatch) => {
        dispatch({
            type: MOSTRAR_ALERTA,
             payload: alerta
        })
    }
}

// ocultar alerta
export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }
}
