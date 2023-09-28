import { DocumentData, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import db from './Firebase/FireConfig';
import { ModalBien } from './ModalBien';
import consultas from './Firebase/Consultas_Firebase';
import { decryptData } from './Encriptacion';



const AgregarMiembro = () => {


  const [dataEdit,setDataEdit] = useState<DocumentData>();
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estatus, setEstatus] = useState('');
  const [nombre, setNombre] = useState();
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMen] = useState<string>('');
  const [titulo, setTitle] = useState<string>('');
  const [subir, setSubi] = useState<boolean>(false);


  const fechaActual: Date = new Date();
  const year: number = fechaActual.getFullYear();
  const month: number = fechaActual.getMonth() + 1; // Months start from 0
  const day: number = fechaActual.getDate();


const session:string = sessionStorage.getItem('user') || 'no valido';
const email:string = sessionStorage.getItem('email') || '';
const clave:string = sessionStorage.getItem('clave') || '';



const id:string = sessionStorage.getItem('id') || '';


useEffect(() => { // Usar useEffect para cargar datos iniciales
    if (session !== 'valido') {
      window.location.href = '/Login';
    } else {
      consultas.getById(id).then((e) => {
        setDataEdit(e);
      });
    }
  }, []);



  const NewMember = async () => {
   const miembro = {
            Fecha_Ingreso: fechaIngreso == '' ? dataEdit?.Fecha_Ingreso : fechaIngreso,
            Fecha_Registro: `${day}-${month}-${year}`,
            cedula: cedula == '' ? dataEdit?.cedula : cedula,
            direccion: direccion == '' ? dataEdit?.direccion : direccion,
            estatus: estatus == '' ? dataEdit?.estatus : estatus,
            nombre: nombre == '' ? dataEdit?.nombre : nombre,
            telefono: telefono == '' ? dataEdit?.telefono : telefono
}

console.log(miembro)

try{
const validacion:boolean = dataEdit == null ? validarCamposNoVacios() : validarEdit();
console.log(validacion)
    const coleccion = collection(db, 'Miembros');
        // Add a new document to the collection with the provided data

        if (window.confirm('esta seguro que los datos estan correctos?') && validacion) {
         consultas.login(decryptData(email,'odiseo153'),decryptData(clave,'odiseo153'),false);
      

          if(dataEdit != null){
          await updateDoc(doc(db,'Miembros',id),miembro);
          setTitle('Correcto');
          setMen('Se actualizo el miembro correctamente');
          setSubi(true)
            }
            else{
          await addDoc(coleccion, miembro);
          setTitle('Correcto');
          setMen('Se guardo el miembro correctamente');
          setSubi(true)}

          setTimeout(function () {
            window.location.href = '/';
          }, 1000);


         
        }
      } catch (error) {
      setTitle('Error');
      setMen('Hubo un error guardando los datos');
          setSubi(true)
      console.log(error);  
    }  
}

 function validarEdit():boolean {
  const camposVacios = [];

  if ( dataEdit?.fechaIngreso == '') {
    camposVacios.push('Fecha de Ingreso');
  }

  if ( dataEdit?.cedula == '') {
    camposVacios.push('Cédula');
  }

  if ( dataEdit?.estatus == '') {
    camposVacios.push('Estatus');
  }

  if ( dataEdit?.direccion == '') {
    camposVacios.push('Dirección');
  }

  if ( dataEdit?.nombre == '') {
    camposVacios.push('Nombre');
  }

  if ( dataEdit?.telefono == '') {
    camposVacios.push('Teléfono');
  }

  if (camposVacios.length > 0) {
    const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
    alert(mensaje);
    return false;
  }

return true;
}


 function validarCamposNoVacios():boolean {
  const camposVacios = [];

  if (fechaIngreso === '' && dataEdit?.fechaIngreso != '') {
    camposVacios.push('Fecha de Ingreso');
  }

  if (cedula === '' && dataEdit?.cedula != '') {
    camposVacios.push('Cédula');
  }

  if (estatus === '' && dataEdit?.estatus != '') {
    camposVacios.push('Estatus');
  }

  if (direccion === '' && dataEdit?.direccion != '') {
    camposVacios.push('Dirección');
  }

  if (nombre === '' && dataEdit?.nombre != '') {
    camposVacios.push('Nombre');
  }

  if (telefono === '' && dataEdit?.telefono != '') {
    camposVacios.push('Teléfono');
  }

  if (camposVacios.length > 0) {
    const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
    alert(mensaje);
    return false;
  }

  return true;
}

  return (
    <div>
      <form>
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Registrar Miembros</h2>
            </div>
            <a href="/" className="botonn btn btn-danger" type="submit">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <div className="card-body">
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
                          defaultValue={dataEdit == null ? '' : dataEdit.nombre}
                          required
                          style={{ width: 'auto' }}
                          onChange={(e) => setNombre(e.target.value)}
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
                      defaultValue={dataEdit == null ? '' : dataEdit.cedula}
                      placeholder="Cedula"
                      required
                      onChange={(e) => setCedula(e.target.value)}
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
                      defaultValue={dataEdit ==null ? '' : dataEdit.direccion}
                      placeholder="Direccion"
                      required
                      onChange={(e) => setDireccion(e.target.value)}
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
                      defaultValue={dataEdit ==null ? '' : dataEdit.Fecha_Ingreso}
                      placeholder="Joining Date"
                      required
                      onChange={(e) => setFechaIngreso(e.target.value)}
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
                          defaultValue={dataEdit ==null ? '' : dataEdit.telefono}
                          placeholder="Phone Number"
                          required
                          onChange={(e) => setTelefono(e.target.value)}
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
                        defaultValue={dataEdit ==null ? '' : dataEdit.estatus}
                        onChange={(e) => setEstatus(e.target.value)}
                      >
                        <option selected></option>
                        <option value="Miembro">Miembro</option>
                        <option value="Socio">Socio</option>
                        <option value="Director">Directivo</option>
                        <option value="Coordinador">Coordinador</option>
                      </select>
                      <div className="select-dropdown"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="botones">
                <a
                  href="#myModal"
                  className="trigger-btn btn btn-success"
                  data-toggle="modal"
                  onClick={NewMember}
                >
                  {dataEdit ==null ? 'Agregar Miembro' : 'Editar Miembro'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
      {subir ? <ModalBien parametro={mensaje} titulo={titulo} /> : ''}
    </div>
  );
};

export default AgregarMiembro;