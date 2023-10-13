import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@utils/hooks/useAuth";
import { UserService } from "@utils/services/UserService";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { RedirectPermission } from "@components/Permission";

export function Password() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password && newPassword && confirmPassword) {
      try {
        setLoading(true);

        const userid = user?.id as string;

        const { error, message } = await UserService.updateAccount({
          scope: "password",
          id: userid,
          payload: {
            password,
            newPassword,
            confirmPassword,
          },
        });

        if (message) {
          toast.success(message);
          setLoading(false);

          const event = new CustomEvent("refresh-account");
          window.dispatchEvent(event);

          navigate("/admin/settings/info");
        } else {
          toast.error(error);
        }
      } catch (ex) {
        setLoading(false);
      }
    }
  };

  const validate =
    loading ||
    !password ||
    !newPassword ||
    !confirmPassword ||
    password.length <= 3 ||
    newPassword.length <= 3 ||
    confirmPassword.length <= 3;

  return (
    <>
      <RedirectPermission required={["update_password"]} />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Alterar senha</h5>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mb-4">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Senha atual"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="Nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group mb-4">
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Button
                  type="submit"
                  className="btn btn-update"
                  disabled={validate}
                  loading={loading}
                >
                  Alterar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
