import { Link } from "react-router-dom";

export function Users() {
  return <div className="container">
    <div className="row">
      <div className="col-md-12">
        <Link to="../user/create">Criar usuário</Link>
      </div>
    </div>
  </div>;
}

export function UserCreate() {
  return <h1>UserCreate</h1>;
}

export function UserView() {
  return <h1>UserView</h1>;
}
