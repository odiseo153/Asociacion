import React from "react";
import consultas from "./Firebase/Consultas_Firebase";



export default function Login(){

const [email,setEmail] = React.useState<string>('');
const [clave,setClave] = React.useState<string>('');
const [valido,setVali] = React.useState<boolean>(false);

sessionStorage.removeItem('id');

const IniciarSesion = ()=>{
try{
consultas.login(email,clave,true).then(e => setVali(e));
}catch(error){
alert('ocurrio un error '+error)
}

}



return (
    <div className="container-fluid" >
      <section className="vh-100 gradient-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius:'5em'}}>
              <div className="card-body p-5 text-center">
               <a href="/" className="botonn btn btn-danger" type="submit" style={{borderRadius:'5em'}}>
                <i className="fa-solid fa-arrow-left"></i>
                </a>
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Inicio De Sesion</h2>
                  <p className="text-white-50 mb-5">Ingrese su nombre y contraseña</p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id={valido ? 'verde':'rojo'}
                      onChange={e => {setEmail(e.target.value);}}
                      placeholder="Nombre de Usuario"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Nombre</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id={valido ? 'verde':'rojo'}
                      onChange={e => {setClave(e.target.value)}}
                      placeholder="Contraseña"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label">Contraseña</label>
                  </div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={()=>IniciarSesion()}>
                    Iniciar Sesion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}