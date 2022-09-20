import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "~/utils/services/api";

import { TableUsers } from "~/components/Tables/Users";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";

import { Empty } from "~/components/Images";

export function Users() {
  const navigate = useNavigate([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();

    window.addEventListener("refresh-users", () => {
      loadUsers();
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadUsers() {
    const { results } = await getUsers();

    if (results) {
      setUsers(results);
    }
  }

  const goCreate = () => navigate("/user/create");

  const columns = [
    {
      Header: "Nome",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Permissões",
      accessor: "permissions",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Usuários" />
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-customers">
              <div className="card-body">
                {users.length > 0 ? (
                  <TableUsers columns={columns} data={users} />
                ) : (
                  <div className="col-sm-12 empty-car text-center">
                    <div className="empty-image pb-3">
                      <Empty className="img-fluid" />
                    </div>
                    <span className="empty-title">
                      Nenhum usuário foi encontrado
                    </span>
                    <small className="empty-description mt-3 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button className="btn btn-create" onClick={goCreate}>
                      <i className="far fa-plus mr-1"></i> Cadastrar usuário
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function UserCreate() {
  return (
    <>
      <Head title="UserCreate" />
      <h1>UserCreate</h1>
    </>
  );
}

export function UserView() {
  return (
    <>
      <Head title="UserView" />
      <h1>UserView</h1>
    </>
  );
}
