import { Link } from "react-router-dom";

export function Brands() {
  return <div className="container">
    <div className="row">
      <div className="col-md-12">
        <Link to="../brand/create">Criar marca</Link>
      </div>
    </div>
  </div>;
}

export function BrandCreate() {
  return <h1>BrandCreate</h1>;
}

export function BrandView() {
  return <h1>BrandView</h1>;
}
