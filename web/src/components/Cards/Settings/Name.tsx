import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "@utils/hooks/useAuth";
import { UserService } from "@utils/services/UserService";

import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { RedirectPermission } from "@components/Permission";

export function Name() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const userid = user?.id as string;

      const { error, message } = await UserService.updateAccount({
        scope: "name",
        id: userid,
        payload: {
          name,
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
  };

  const validate = loading || !name || name.length <= 5 || name === user?.name;

  return (
    <>
      <RedirectPermission required={["update.name"]} />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Alterar nome</h5>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mb-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
