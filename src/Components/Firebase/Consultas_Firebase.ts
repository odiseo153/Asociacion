import db from "./FireConfig";
import { getDocs, collection, deleteDoc, DocumentData } from 'firebase/firestore';

interface Consultas {
  Get: (NombreColeccion: string) => Promise<DocumentData[]>;
  login: (nombre: string, clave: string) => Promise<boolean>;
  Borrar: (titulo: string) => Promise<void>;
}

const consultas: Consultas = {
  Get: async function (NombreColeccion: string): Promise<DocumentData[]> {
    const coleccion = collection(db, NombreColeccion);
    const datos = await getDocs(coleccion);
    const data = datos.docs.map(doc => doc.data());
    return data;
  },
  login: async function (nombre: string, clave: string): Promise<boolean> {
    const coleccion = collection(db, 'Usuarios');
    const datos = await getDocs(coleccion);
    let valido = false;
    datos.docs.map(doc => {
      const val = doc.data().Nombre == nombre && doc.data().Clave == clave;
      if (val) {
        valido = true;
      }
    });
    return valido;
  },
  Borrar: async function (titulo: string): Promise<void> {
    const docu:any = (await consultas.Get('Publicaciones')).find(f => f.titulo == titulo);
    console.log(docu.titulo);
    await deleteDoc(docu);
  }
};


export default consultas;