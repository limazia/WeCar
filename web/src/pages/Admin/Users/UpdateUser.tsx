import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { toast } from "react-toastify";

import { GroupService } from "@shared/services/GroupService";
import { UserService } from "@shared/services/UserService";

import { Head } from "@components/Head";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Select } from "@components/Forms/Select";
import { RedirectPermission } from "@components/Permission";
import { Spinner } from "@components/Spinner";

export function UpdateUser() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGroups();
    loadUserById(id);
  }, []);

  async function loadGroups() {
    const { results } = await GroupService.list();

    if (results) {
      setGroups(results);
      setLoading(false);
    }
  }

  async function loadUserById(id: string) {
    const response = await UserService.findById({ id });

    if (response === undefined) {
      navigate("/admin/users");
    } else {
      if (!response.is_deleteable) {
        navigate("/admin/");
      }

      setName(response.name);
      setEmail(response.email);
      setGroup(response.role_id);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error, message } = await UserService.update({
        id,
        payload: {
          name,
          email,
          id_group: group,
          password,
          confirmPassword,
        },
      });

      if (message) {
        toast.success(message);
        setName("");
        setEmail("");
        setGroup("");
        setPassword("");
        setConfirmPassword("");

        setLoading(false);

        navigate("/admin/users");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return loading || !name || !email || !emailRegex.test(email);
  };

  return (
    <>
      <Head title="Editando usuário" />
      <RedirectPermission required={["users.update"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-users">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/users/">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Editando usuário</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          disabled={loading}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          disabled={loading}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="id_group">Grupo</label>
                        <Select.Root
                          name="id_group"
                          id="id_group"
                          disabled={loading}
                          value={group}
                          onChange={(e) => setGroup(e.target.value)}
                        >
                          {groups?.map(
                            ({ group_id, group_name, is_deleteable }) => (
                              <>
                                {is_deleteable && (
                                  <option key={group_id} value={group_id}>
                                    {group_name}
                                  </option>
                                )}
                              </>
                            )
                          )}
                        </Select.Root>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          disabled={loading}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <Input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          disabled={loading}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <Button
                        className="btn btn-primary-w btn-block"
                        disabled={isValid()}
                      >
                        {loading ? (
                          <>
                            <Spinner /> Atualizando...
                          </>
                        ) : (
                          "Atualizar"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
