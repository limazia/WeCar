import { permissions } from "~/utils/database/permissions";

export function PermissionsModal() {
  return (
    <div
      className="modal fade"
      id="permissionsModal"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-content-center">
                  <h5 className="card-title">Grupo de permissão</h5>
                  <span data-dismiss="modal" style={{ cursor: "pointer" }}>
                    <i className="far fa-times"></i>
                  </span>
                </div>
                <div className="mt-3">
                  {Object.entries(permissions).map(([key, value], index) => (
                    <div key={index} className={`${index === 0 ? "" : "mt-4"}`}>
                      <span>{key}</span>
                      {value.map(({ permission, description }, index) => (
                        <p key={index} className="mb-0">
                          {permission}: <small>{description}</small>
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
