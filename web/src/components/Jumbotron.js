export function Jumbotron() {
  const image = "https://wallpaperaccess.com/full/7430329.jpg";

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="jumbotron-main">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}
