import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api, { getBrands, getBrandById } from "~/utils/services/api";

import { TableBrands } from "~/components/Tables/Brands";
import { Loading } from "~/components/Partials/Loading";
import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Forms/Spinner";

import { Empty } from "~/components/Images";

export function Brands() {
  const navigate = useNavigate([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();

    window.addEventListener("refresh-brands", () => {
      loadBrands();
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  async function loadBrands() {
    const { results } = await getBrands();

    if (results) {
      setBrands(results);
    }
  }

  const goCreate = () => navigate("../brand/create");

  const columns = [
    {
      Header: "Marca",
      accessor: "brand_name",
    },
    {
      Header: "Slug",
      accessor: "brand_slug",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Marcas" />
      <div className="container mt-3 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-customers">
              <div className="card-body">
                {brands.length > 0 ? (
                  <TableBrands columns={columns} data={brands} />
                ) : (
                  <div className="col-sm-12 empty-car text-center">
                    <div className="empty-image pb-3">
                      <Empty className="img-fluid" />
                    </div>
                    <span className="empty-title">
                      Nenhuma marca foi encontrada
                    </span>
                    <small className="empty-description mt-3 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button className="btn btn-create-table" onClick={goCreate}>
                      <i className="far fa-plus mr-1"></i> Cadastrar marca
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

export function BrandCreate() {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    brand_name: "",
    brand_slug: "",
  };

  const [brand, setBrand] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setBrand({ ...brand, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { brand_name, brand_slug } = brand;

    if (brand_name && brand_slug) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/brand", { brand });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setBrand(INITIAL_STATE);
          setLoading(false);
          navigate("../brands");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title="Cadastrar marca" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Cadastrar marca</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_name">Nome da marca</label>
                          <input
                            type="text"
                            id="brand_name"
                            name="brand_name"
                            className="form-control"
                            value={brand.brand_name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_slug">Nome da marca</label>
                          <input
                            type="text"
                            id="brand_slug"
                            name="brand_slug"
                            className="form-control"
                            value={brand.brand_slug}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !brand.brand_name || !brand.brand_slug
                              ? true
                              : false
                          }
                        >
                          {loading ? <Spinner /> : "Criar marca"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function BrandUpdate() {
  const { brand_id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState({
    brand_name: "",
    brand_slug: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrandById(brand_id);
  }, []);

  async function loadBrandById(brand_id) {
    const { results, error } = await getBrandById(brand_id);

    console.log(results);

    if (error) {
      navigate("../brands");
    } else {
      setBrand(results);
    }
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setBrand({ ...brand, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { brand_name, brand_slug } = brand;

    if (brand_name && brand_slug) {
      setLoading(true);

      try {
        const { data } = await api.patch(`/api/brand/${brand_id}`, {
          brand_name,
          brand_slug,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setLoading(false);
          navigate("../brands");
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title={`Editar ${brand?.brand_name}`} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Editar marca</h3>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_name">Nome da marca</label>
                          <input
                            type="text"
                            id="brand_name"
                            name="brand_name"
                            className="form-control"
                            value={brand?.brand_name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="brand_slug">Nome da marca</label>
                          <input
                            type="text"
                            id="brand_slug"
                            name="brand_slug"
                            className="form-control"
                            value={brand?.brand_slug}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-create btn-block"
                          disabled={
                            !brand?.brand_name || !brand?.brand_slug
                              ? true
                              : false
                          }
                        >
                          {loading ? <Spinner /> : "Atualizar"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
