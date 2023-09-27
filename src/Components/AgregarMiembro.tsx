
import { addDoc, collection } from 'firebase/firestore';
import  { useState } from 'react';
import db from './Firebase/FireConfig'
import ModalBien from './ModalBien';

const AgregarMiembro = () => {
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estatus, setEstatus] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje,setMen]=useState(false);

const fechaActual: Date = new Date();
const year: number = fechaActual.getFullYear();
const month: number = fechaActual.getMonth() + 1; // Los meses comienzan desde 0
const day: number = fechaActual.getDate();

const NewMember =async ()=>{
const coleccion = collection(db,'Miembros');
try {

    // Agrega un nuevo documento a la colección con los datos proporcionados

if(window.confirm('esta segur@ que los datos estan correctos?')){
 await addDoc(coleccion, {
    Fecha_Ingreso: fechaIngreso,
    Fecha_Registro: `${day}-${month}-${year}`,
    cedula: cedula,
    direccion: direccion,
    estatus: estatus,
    nombre: nombre,
    telefono: telefono
    });

   setMen(true);
}

/*
console.log({    Fecha_Ingreso: fechaIngreso,
    Fecha_Registro:`${day}-${month}-${year}`,
    apellido: apellido,
    cedula: cedula,
    direccion: direccion,
    estatus: estatus,
    nombre: nombre,
    telefono: telefono})
*/

  } catch (error) {
    setMen(false);
   
  }
};

  return (

<div>

<form>        
<div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">

              <h2 className="title">Registrar Miembros</h2>
            </div>
               <a href='/' className="botonn btn btn-danger" type="submit">
                    <i className="fa-solid fa-arrow-left"></i>
                  </a>

            <div className="card-body" >
                <div className="form-row m-b-55">
                  <div className="name">Nombre</div>
                  <div className="value">
                    <div className="row row-space">
                      <div className="col-2">
                        <div className="input-group-desc">
                          <input
                            className="input--style-5"
                            type="text"
                            name="first_name"
                            placeholder="Nombre Completo"
                            required
                            style={{width:'auto'}}
                                          onChange={e=>setNombre(e.target.value)}
                          />
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">Cedula</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="company"
                        placeholder="Cedula"
                        required
                        onChange={e=>setCedula(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

               <div className="form-row">
                  <div className="name">Direccion</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        type="text"
                        name="company"
                        placeholder="Direccion"
                        required
                        onChange={e=>setDireccion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">Fecha de Ingreso</div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5"
                        style={{ height: '3em' }}
                        type="date"
                        name="email"
                        
                        placeholder="Joining Date"
                        required
                        onChange={e=>setFechaIngreso(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row m-b-55">
                  <div className="name">Telefono</div>
                  <div className="value">
                    <div className="row row-refine">
                      <div className="col-3"></div>
                      <div className="col-9" style={{ left: '-15%' }}>
                        <div className="input-group-desc">
                          <input
                            className="input--style-5"
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            onChange={e=>setTelefono(e.target.value)}
                          />
                          <label className="label--desc">Phone Number</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>




                <div className="form-row">
                  <div className="name">Status</div>
                  <div className="value">
                    <div className="input-group">
                      <div
                        className="rs-select2 js-select-simple select--no-search"
                        style={{ left: '1em', position: 'relative' }}
                      >
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={e=>setEstatus(e.target.value)}
                        >
                          <option value="Miembro" selected>Member</option>
                          <option value="Socio">Socio</option>
                          <option value="Director">Directivo</option>
                          <option value="Coordinador">Coordinador</option>
                        </select>
                        <div className="select-dropdown"></div>
                     
 </div>

                    </div>
                  </div>

                </div>
                <div className='botones'>
                  <a  href="#myModal" className="trigger-btn btn btn-success" data-toggle="modal" onClick={NewMember}>
                    Agregar Miembro
                  </a>
                </div>

            </div>
          </div>
        </div>
</form>

<ModalBien parametro={mensaje}/>

      </div>
 
  );
};

export default AgregarMiembro;


