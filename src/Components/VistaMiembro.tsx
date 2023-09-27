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

function VistaMiembro() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [busqueda, setBusqueda] = React.useState<string>('');
  const [categoria, setCat] = React.useState<string>('');

  let i=0;

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
                <select className="form-control" id="selectOption" name='select' onChange={(e) => setCat(e.target.value)}>
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
      <Fab href='/agregar' color="primary" className='add btn btn-primary'>
        <i className="fa-solid fa-plus"></i>
      </Fab>
      <CSVLink data={data} filename='Miembros.csv' className='excel btn btn-success'>Exportar en Excel</CSVLink>
      <Paper sx={{ width: '100%', overflow: 'hidden', top: '6em', position: 'relative' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Cedula</TableCell>
                <TableCell>Fecha de registro</TableCell>
                <TableCell>Fecha de Ingreso</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>telefono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DatosFiltros().map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i++}>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.apellido}</TableCell>
                    <TableCell>{row.cedula}</TableCell>
                    <TableCell>{row.Fecha_Ingreso}</TableCell>
                    <TableCell>{row.Fecha_Registro}</TableCell>
                    <TableCell>{row.direccion}</TableCell>
                    <TableCell>{row.estatus}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
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