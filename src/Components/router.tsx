import { Route,Routes,BrowserRouter} from "react-router-dom";
import NoPage from "./NoPage";
import VistaMiembro from "./VistaMiembro";
import AgregarMiembro from "./AgregarMiembro";
import Login from "./Login";



export default function Routers() {
  return (
<BrowserRouter>
      <Routes>
          <Route path="/miembros" element={<VistaMiembro />} />
          <Route path="/agregar/:id" element={<AgregarMiembro />} />
          <Route path="/agregar" element={<AgregarMiembro />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
    </BrowserRouter>
  );
}













