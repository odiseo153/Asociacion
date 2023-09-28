import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import consultas from './Firebase/Consultas_Firebase'
import { DocumentData } from 'firebase/firestore';
import { Fab } from '@mui/material';
import { CSVLink } from 'react-csv';
import { decryptData } from './Encriptacion';


function VistaMiembro() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [busqueda, setBusqueda] = React.useState<string>('');
  const [categoria, setCat] = React.useState<string>('');
  let i=0;


//<CSVLink data={data} filename='Miembros.csv' className='excel btn btn-success'>Exportar en Excel</CSVLink>



const session:string = sessionStorage.getItem('user') || 'no valido';
const email:string = sessionStorage.getItem('email') || '';
const clave:string = sessionStorage.getItem('clave') || '';

sessionStorage.removeItem('id');


console.log(data);


const editOrAdd = (id:string )=>{
sessionStorage.setItem('id',id)
}

const Borrar = (id:string) =>{
console.log(id)
consultas.login(decryptData(email,'odiseo153'),decryptData(clave,'odiseo153'),false);
if(session ==='valido'){
consultas.Borrar(id);

        setTimeout(function () {
            window.location.href = '/';
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

    return datosFiltrados;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form className="form-inline">
              <div className="form-group">
                <label>Búsqueda:</label>
                <input type="text" className="form-control" id="busqueda" onChange={e => setBusqueda(e.target.value)} placeholder="Buscar" />
              </div>
              <div className="form-group mx-sm-3">
                <br />
                <label aria-label="selectOption">Seleccionar un Estatus:</label>
                <select className="form-control" id="selectOption" title='select' name='l' onChange={(e) => setCat(e.target.value)}>
                  <option value=''>Todos</option>
                  <option value='Socio'>Socio</option>
                  <option value='Coordinador'>Coordinador</option>
                  <option value='Miembro'>Miembro</option>
                </select>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
      <br />
      <Fab href={session == 'valido' ? '/agregar' : '/Login'} color="primary" className='add btn btn-primary'>
        <i className="fa-solid fa-plus"></i>
      </Fab>
      <CSVLink data={data} filename='Miembros.csv' className='excel btn btn-success'>Exportar en Excel</CSVLink>
      <Paper sx={{ width: '100%', overflow: 'hidden', top: '6em', position: 'relative' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cedula</TableCell>
                <TableCell>Fecha de registro</TableCell>
                <TableCell>Fecha de Ingreso</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>telefono</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DatosFiltros().map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i++}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.cedula}</TableCell>
                    <TableCell>{row.Fecha_Ingreso}</TableCell>
                    <TableCell>{row.Fecha_Registro}</TableCell>
                    <TableCell>{row.direccion}</TableCell>
                    <TableCell>{row.estatus}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>
 <a  className='btn btn-danger' onClick={() => {Borrar(row.id)}}><i className="fa-solid fa-trash"></i></a>
 <a href='/agregar' className='btn btn-success' onClick={()=>{editOrAdd(row.id)}}><i className="fa-solid fa-user-pen"></i>

</a>
 </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default VistaMiembro;