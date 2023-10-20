import * as React from "react";
import consultas from "./Firebase/Consultas_Firebase";
import { DocumentData } from "firebase/firestore";
import { decryptData } from "./Encriptacion";
import { TablePagination } from "@mui/material";
import * as Exceljs from "exceljs";

function VistaMiembro() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [busqueda, setBusqueda] = React.useState<string>("");
  const [categoria, setCat] = React.useState<string>("");

  const session: string = sessionStorage.getItem("user") || "no valido";
  const email: string = sessionStorage.getItem("email") || "";
  const clave: string = sessionStorage.getItem("clave") || "";
  sessionStorage.removeItem("id");

  const Direccion =
    session == null || session === "no valido" || email == null || clave == null
      ? false
      : true;

  if (!Direccion) {
    window.location.href = "/";
  }

  const editOrAdd = (id: string) => {
    sessionStorage.setItem("id", id);
  };

  const Borrar = (id: string) => {
    consultas.login(
      decryptData(email, "odiseo153"),
      decryptData(clave, "odiseo153"),
      false
    );
    if (session === "valido") {
      consultas.Borrar(id);
    } else {
      alert("No tiene permisos para realizar esta acción");
      window.location.href = "/Login";
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await consultas.Get("Miembros");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const exportToExcel = async () => {
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Miembros");
    worksheet.addRow([
      "Nombre",
      "Fecha De Ingreso",
      "Fecha De Registro",
      "Cedula",
      "Estatus",
      "Telefono",
      "Direccion",
    ]);

    data.map((row) => {
      const rowData = [
        row.nombre,
        row.Fecha_Ingreso,
        row.Fecha_Registro,
        row.cedula,
        row.estatus,
        row.telefono,
        row.direccion,
      ];
      worksheet.addRow(rowData);
    });

    const blob = await workbook.xlsx.writeBuffer();
    const blobData = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Miembros.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const DatosFiltros = (): DocumentData[] => {
    let datosFiltrados = data;
    if (busqueda !== "") {
      datosFiltrados = data.filter((x) =>
        x.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (categoria !== "") {
      datosFiltrados = data.filter((x) =>
        x.estatus.toLowerCase().includes(categoria.toLowerCase())
      );
    }
    if (categoria !== "" && busqueda !== "") {
      datosFiltrados = data.filter(
        (x) =>
          x.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          x.estatus.toLowerCase().includes(categoria.toLowerCase())
      );
    }
    return datosFiltrados.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return (
    <div>
      <div className="container1">
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre"
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setCat("");
                }}
                aria-label="Campo de búsqueda"
              />
            </div>
          </div>
          <div className="radio-inputs">
            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="socio"
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <span className="name">Socio</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="Coordinador"
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <span className="name">Coordinador</span>
            </label>

            <label className="radio">
              <input
                type="radio"
                name="radio"
                value="Miembro"
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <span className="name">Miembro</span>
            </label>

            <label className="radio">
              <input
                type="radio"
                name="radio"
                value=""
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <span className="name">Todos</span>
            </label>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
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
    {DatosFiltros().map((e, i) => {
      return (
        <tr key={i}>
          <td>{e.nombre}</td>
          <td>{e.Fecha_Ingreso}</td>
          <td>{e.Fecha_Registro}</td>
          <td>{e.cedula}</td>
          <td>{e.estatus}</td>
          <td>{e.telefono}</td>
          <td>{e.direccion}</td>
          <td className="btn-group">
            <a
              href={Direccion ? "/agregar/" + e.id : "/Login"}
              onClick={() => editOrAdd(e.id)}
              className="btn btn-success btn-sm mr-3"
            >
              <i className="fa-solid fa-pencil"></i>
            </a>
            <a
              onClick={() => Borrar(e.id)}
              className="btn btn-danger btn-sm"
            >
              <i className="fa-solid fa-trash"></i>
            </a>
          </td>
        </tr>
      );
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
            <div className="" role="group">
              <a
                href={Direccion ? "/agregar" : "/Login"}
                className="btn btn-primary"
                type="button"
              >
                Agregar Miembro
              </a>
              <button className="btn btn-success" onClick={exportToExcel}>
                Exportar datos a Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaMiembro;
