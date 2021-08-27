import React from 'react';
import Producto from './Producto'
import {Link} from 'react-router-dom'

const Productos = () => { 

    return (
      <div className="cont_products">
        <Link  to = "/productos/nuevo" className="btn btn_new">Nuevo</Link>
             <table>
             <thead>
               <tr className="tr-head">
                 <th className="th-head">Producto</th>
                 <th className="th-head">Precio</th>
                 <th className="th-head">Acciones</th>
               </tr>
             </thead>
             <tbody>
                 <Producto/>
              </tbody>
           </table>
 
          
   </div>
     );
}
 
export default Productos;