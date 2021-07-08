import {Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import FormComponent from './formComponent';


function App() {
  return (
    <div className="App">
      <Navbar dark color ="primary">
        <div className = "container">
          <NavbarBrand href="/"> Voublazars</NavbarBrand>
        </div>
      </Navbar>
      <FormComponent />
    </div>
  );
}

export default App;
