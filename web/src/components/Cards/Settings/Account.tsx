import { useAuth } from "@utils/hooks/useAuth";

import { RedirectPermission } from "@components/Permission";

export function Account() {
  const { user } = useAuth();

  return (
    <>
      <RedirectPermission required={["view_account"]} />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Informações da Conta</h5>

          <div className="mt-4">
            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold">Nome</span>
              <p>{user?.name}</p>
            </div>

            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold">Email</span>
              <p>{user?.email}</p>
            </div>

            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold">Grupo</span>
              <p>{user?.group?.name}</p>
            </div>

            <div className="d-flex flex-column">
              <span className="text-muted font-weight-bold">Registro</span>
              <p>{user?.created_at.toString()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
