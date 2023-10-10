import consultas from "./Firebase/Consultas_Firebase";
import React from "react";

export default function Navbar(){
 const [cantidad, setData] = React.useState<number>();


const CerrarSesion = async()=>{
window.location.href = '/'
sessionStorage.removeItem('user');
sessionStorage.removeItem('email');
sessionStorage.removeItem('clave');

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

<div>
    <span style={{borderRadius:'5em'}} className='btn btn-success'><i className="fa-solid fa-users"></i>{cantidad}</span>

    <form className="form-inline my-2 my-lg-0">
      <button style={{borderRadius:'5em'}} className='btn btn-danger' onClick={CerrarSesion}>Cerrar Sesion <i className="fa-solid fa-right-from-bracket"></i></button>
    </form>
</div>


</div>
)
}