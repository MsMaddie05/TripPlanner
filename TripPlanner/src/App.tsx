import { AuthProvider } from "./components/AuthProvider";
import Routing from "./components/Routing";

import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </>
  )
}

export default App
