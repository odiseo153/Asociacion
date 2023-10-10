import {useState,useEffect} from "react";
import consultas from "./Firebase/Consultas_Firebase";



export default function Login(){

const [email,setEmail] = useState<string>('');
const [clave,setClave] = useState<string>('');
const [valido,setVali] = useState<boolean>(false);

sessionStorage.removeItem('id');




const IsLogeado = sessionStorage.getItem('user');

if(IsLogeado === 'valido'){
window.location.href = '/miembros'
}

const IniciarSesion = ()=>{
try{
consultas.login(email,clave,true).then(e => {setVali(e)});
}catch(error){
alert('ocurrio un error '+error) 
}

}







return (
    
    <section className="vh-10" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card login_card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: 'red' }}></i>
                        <span className="h1 fw-bold mb-0">Asociacion Invi San Luis</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        entra con tu email y contraseña
                      </h5>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example17" onChange={(e)=>setEmail(e.target.value)} placeholder="Correo" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form2Example17">
                          Direccion De Correo
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example27" onChange={(e)=>setClave(e.target.value)} placeholder="Contraseña" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form2Example27">
                          Contraseña
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={IniciarSesion}>
                          Login
                        </button>
                      </div>
                     
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}