import db from "./FireConfig";
import { getDocs,getDoc, doc, collection, deleteDoc, DocumentData } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { encryptData } from "../Encriptacion";

interface Consultas {
  Get: (NombreColeccion: string) => Promise<DocumentData[]>;
  login: (nombre: string, clave: string,login:boolean) =>Promise<boolean>;
  Borrar: (id: string) => Promise<void>;
 getById: (id: string) => Promise<DocumentData | undefined>;

}





const consultas: Consultas = {
  Get: async function (NombreColeccion: string): Promise<DocumentData[]> {
    
    const coleccion = collection(db, NombreColeccion);
    const datos = await getDocs(coleccion);
    
   const data = datos.docs.map(doc => {
    const id = doc.id; // Accede al ID del documento
    const documentoData = doc.data(); // Accede a los datos del documento
    return { id, ...documentoData }; // Combina el ID y los datos en un objeto
  });
    return data;
  },

  getById: async function ( id: string): Promise<DocumentData | undefined> {
    const coleccion = collection(db,'Miembros');
    const documento =await doc(coleccion, id);
     
    const docSnap = await getDoc(documento);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return undefined;
    }
  },
  login: async function (nombre: string, clave: string, login: boolean = false): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, nombre, clave)
      .then(function (userCredential) {
        // Autenticación exitosa
        const user = userCredential.user;
        console.log("Usuario autenticado:", user);

        sessionStorage.setItem('email', encryptData(nombre, 'odiseo153'));
        sessionStorage.setItem('clave', encryptData(clave, 'odiseo153'));
        sessionStorage.setItem('user', 'valido');

        if (login) {
          setTimeout(function () {
            window.location.href = '/agregar';
          }, 1500);
        }

        resolve(true);
      })
      .catch(function (error) {
        // Error de autenticación
        sessionStorage.setItem('user', 'no valido');
        const errorMessage = error.message;
        console.error("Error de autenticación:", errorMessage);
        alert(errorMessage);
        setTimeout(function () {
          window.location.href = '/Login';
        }, 1500);

        reject(false);
      });
  });
},

  Borrar: async function (id: string): Promise<void> {
    const coleccion = collection(db,'Miembros');
    const documento = doc(coleccion, id);
    //const miembro = await getDoc(documento);
    
    deleteDoc(documento)
  .then(() => {
    console.log('Documento eliminado con éxito');
  })
  .catch((error) => {
    console.error('Error al eliminar el documento:', error);
  });
  }
};


export default consultas;