import { DocumentData } from "firebase/firestore";
import consultas from "./Firebase/Consultas_Firebase";
import React from "react";

export default function Navbar(){
 const [cantidad, setData] = React.useState<number>([]);


const session = sessionStorage.getItem('user');
const sessionValida:boolean = session?.trim() == null || session === 'no valido' ? false : true;


const CerrarSesion =()=>{
sessionStorage.removeItem('user');
sessionStorage.removeItem('email');
sessionStorage.removeItem('clave');

window.location.href = '/'
}

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await consultas.Get('Miembros');
        setData(result.length);
      } catch (error) {
        console.error('Error fetching cantidad:', error);
      }
    };
    fetchData();
  }, []);

return(
<div>
<nav style={{borderRadius:'2em'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">Controlador De Miembros</a>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
 <span style={{borderRadius:'5em'}} className='btn btn-success'><i className="fa-solid fa-users"></i>  {cantidad}</span>
  
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <button style={{borderRadius:'5em'}} className='btn btn-danger' onClick={CerrarSesion}>Cerrar Sesion <i className="fa-solid fa-right-from-bracket"></i></button>
    </form>
  </div>
</nav>
</div>
)
}