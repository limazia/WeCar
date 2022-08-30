export function CardCar() {
  return (
    <div className="card card-car p-1">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="car-info">
          <small className="d-block text-muted">
            <span className="font-weight-bold">Sabado</span>, 14:50
          </small>
          <span className="font-weight-bold">Audi TT (2014)</span>
        </div>
        <div className="car-favorite">
          <i className="fas fa-stars"></i>
        </div>
      </div>
      <div className="car-image">
        <img
          className="card-img-top"
          src="https://motorshow.com.br/wp-content/uploads/sites/2/2018/05/9_ms416_audi-tt-rs1.jpg"
          alt=""
        />
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <span className="text-muted d-block">KM</span> <b>42.800</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Ano</span> <b>2015/2016</b>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <span className="text-muted d-block">Combustível</span>
            <b>Gasolina</b>
          </div>
          <div className="col-md-6">
            <span className="text-muted d-block">Câmbio</span>
            <b>Automática</b>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <h4 className="font-weight-bold mb-0 pb-0">R$ 179.890</h4>
        <a href="#" className="btn btn-more-details">
          Mais detalhes
        </a>
      </div>
    </div>
  );
}
