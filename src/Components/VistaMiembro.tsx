import * as React from 'react';
import consultas from './Firebase/Consultas_Firebase'
import { DocumentData } from 'firebase/firestore';
import { CSVLink } from 'react-csv';
import { decryptData,ValidarSession } from './Encriptacion';
import { TablePagination } from '@mui/material';


function VistaMiembro() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [busqueda, setBusqueda] = React.useState<string>('');
  const [categoria, setCat] = React.useState<string>('');

//ValidarSession();

const session:string = sessionStorage.getItem('user') || 'no valido';
const email:string = sessionStorage.getItem('email') || '';
const clave:string = sessionStorage.getItem('clave') || '';


sessionStorage.removeItem('id');


console.log(data);

const Direccion = 
session ==null ||
session === 'no valido' ||
email ==null ||
clave ==null ?
false :
true;

if(!Direccion){
window.location.href = '/';
}

const editOrAdd = (id:string )=>{
sessionStorage.setItem('id',id)
}

const Borrar = (id:string) =>{
console.log(id)
consultas.login(decryptData(email,'odiseo153'),decryptData(clave,'odiseo153'),false);
if(session ==='valido'){
consultas.Borrar(id);

        setTimeout(function () {
            window.location.href = '/miembro';
          }, 1000);
}
else{

alert("No tiene permisos para realizar esta acción"); 
window.location.href = '/Login';

}
}

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await consultas.Get('Miembros');
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const DatosFiltros = (): DocumentData[] => {
    let datosFiltrados = data;

    if (busqueda !== '') {
      datosFiltrados = data.filter(x => x.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    }

    if (categoria !== '') {
      datosFiltrados = data.filter(x => x.estatus.toLowerCase().includes(categoria.toLowerCase()));
    }

    if (categoria !== '' && busqueda !== '') {
      datosFiltrados = data.filter(x => x.nombre.toLowerCase().includes(busqueda.toLowerCase()) || x.estatus.toLowerCase().includes(categoria.toLowerCase()));
    }

    return datosFiltrados.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }



  return (
    <div>
     <div className="container1">
      <div className="row mt-4">
        <div className="col-md-6">
          {/* Campo de búsqueda */}
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Buscar por nombre" onChange={(e)=>{setBusqueda(e.target.value)}} aria-label="Campo de búsqueda" />

          </div>
        </div>
        <div className="col-md-6">
          {/* Select */}
          <select className="form-control" onChange={(e)=>{setCat(e.target.value)}}>
            <option value=''>Todos</option>
            <option value='Miembro'>Miembros</option>
            <option value='Socio'>Socios</option>
            <option value='Coordinador'>Coordinadores</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="" role="group">
            <a href={Direccion ? '/agregar' : '/Login'} className="btn btn-primary" type="button">Agregar Miembro</a>
            <CSVLink  className="btn btn-success" data={data} filename='Miembros.csv'>Exportar datos a Excel</CSVLink>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha de Registro</th>
 <th scope="col">Fecha de Ingreso</th>                  
<th scope="col">Cédula</th>
                  <th scope="col">Estatus</th>
                  <th scope="col">Teléfono</th>
                    <th scope="col">Dirección</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>

                
              {DatosFiltros().map((e,i) =>{
return (
<tr key={i}>
                 <td>{e.nombre}</td>
                  <td>{e.Fecha_Ingreso}</td>
                  <td>{e.Fecha_Registro}</td>
                  <td>{e.cedula}</td>
                  <td>{e.estatus}</td>
                  <td>{e.telefono}</td>
                  <td>{e.direccion}</td>
                  <td>  
                    <a href={Direccion ? '/agregar/'+e.id : '/Login'} onClick={()=>editOrAdd(e.id)} className="btn btn-success btn-sm mr-2" ><i className="fa-solid fa-pencil"></i></a>
                    <a onClick={()=>Borrar(e.id)} className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></a>
                  </td>
             
</tr>
)
})}
                
                

              </tbody>
            </table>
<TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={data.length} 
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }}
/>

          </div>
        </div>
      </div>  
    </div>

    </div>
  );
}

export default VistaMiembro;