import "./App.css";
import Navbar from "./Components/Navbar";
import Routers from "./Components/router";

function App() {
  const session = sessionStorage.getItem("user");
  const sessionValida: boolean =
    session?.trim() == null || session === "no valido" ? false : true;

  return (
    <>
      {sessionValida && (
        <div>
          <Navbar />
        </div>
      )}
      <Routers />
    </>
  );
}

export default App;
