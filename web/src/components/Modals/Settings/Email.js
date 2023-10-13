import React, { useState } from "react";
import { toast } from "react-toastify";

import api from "~/utils/services/api";
import useAuth from "~/utils/hooks/useAuth";

import { Spinner } from "~/components/Partials/Spinner";

export function EmailModal() {
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/me/email/${user.id}`, { email });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setEmail("");
          window.$("#emailModal").modal("hide");
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
      toast.error("Digite um email para continuar!");
    }
  }

  window.$("#emailModal").on("hide.bs.modal", function (event) {
    setEmail("");
  });

  return (
    <div className="modal fade" id="emailModal" tabIndex="-1" role="dialog">
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
                  <h5 className="edit-option">Editar email</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    disabled={
                      !email ||
                      email.length <= 5
                        ? true
                        : false
                    }
                    className="btn btn-update btn-modal btn-block"
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
 