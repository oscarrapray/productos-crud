import React from 'react'

const Producto = () =>{



    return(
        <tr>
           <td>arroz</td>
           <td>400</td>
           <td>
               <button className="btn btn_edit" >Editar</button>
               <button className="btn btn_delete" >Eliminar</button>
           </td>
         </tr>
    )
}

export default Producto