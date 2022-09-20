import React, { useState } from "react";
import { toast } from "react-toastify";

import api from "~/utils/services/api";
import useAuth from "~/utils/hooks/useAuth";

import { Spinner } from "~/components/Forms/Spinner";

export function PasswordModal() {
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    if (password && newPassword && confirmPassword) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/me/password/${user.id}`, {
          password,
          newPassword,
          confirmPassword,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setPassword("");
          setNewPassword("");
          setConfirmPassword("");
          window.$("#passwordModal").modal("hide");
        } else {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  }

  window.$("#passwordModal").on("hide.bs.modal", function (event) {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  });

  return (
    <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content modal-settings">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 text-center">
                  <h5 className="edit-option">Editar senha</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Senha atual"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      new="confirmPassword"
                      className="form-control"
                      placeholder="Confirmar senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    disabled={
                      !password ||
                      !newPassword ||
                      !confirmPassword ||
                      password.length <= 3 ||
                      newPassword.length <= 3 ||
                      confirmPassword.length <= 3
                        ? true
                        : false
                    }
                    className="btn btn-update btn-block"
                  >
                    {loading ? <Spinner type="grow" /> : "Salvar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 