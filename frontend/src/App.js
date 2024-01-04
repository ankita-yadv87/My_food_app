import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cards from "./components/Cards";
import CardsDetails from "./components/CardsDetails";
import Payments from "./components/Payments";
import Login from "./components/Login";
import { useState } from "react";
import Alert from "./components/Alert";
import Signup from "./components/Signup";


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
    setAlert(null);
    }, 4000);
  };

  return (
    <div >
      <BrowserRouter>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Cards showAlert={showAlert}/>} />
          <Route path="/cart/:id" element={<CardsDetails showAlert={showAlert}/>} />
          <Route path="/payments" element={<Payments showAlert={showAlert}/>} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          {/* <Route path="/cart" element={<Cart/>} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
