import SearchBackground from "~/assets/bg-search.jpeg";

export function Jumbotron() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="jumbotron-main">
          <img src={SearchBackground} loading="lazy" alt="" />
        </div>
      </div>
    </div>
  );
}
