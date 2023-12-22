import "./App.css"
import { GridNode } from "./components/GridNode"
import { NavBar } from "./components/NavBar"
import { SideBar } from "./components/SideBar"

function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <GridNode />
        <SideBar />
      </main>
    </>
  )
}

export default App
