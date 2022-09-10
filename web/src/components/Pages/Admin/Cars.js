import { Link } from "react-router-dom";

export function Cars() {
  return <div className="container">
    <div className="row">
      <div className="col-md-12">
        <Link to="../car/create">Criar carro</Link>
      </div>
    </div>
  </div>;
}

export function CarCreate() {
  return <h1>CarCreate</h1>;
}

export function CarView() {
  return <h1>CarView</h1>;
}
