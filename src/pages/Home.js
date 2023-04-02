import "../styles/backwrap.css"

export default function Home() {

  let backshape = []
  const shapes = ["∨", "∧", "→", "↔", "¬"]
  for(let i = 0; i < shapes.length * 10; i++) {
    let style = {
      top: Math.random() * (101) + "%",
      left: Math.random() * (101) + "%",
      animationDelay: Math.random() * 10 - 10 + "s"
    }
    backshape.push(<span className="floating" style={style} key={i}>{shapes[i % shapes.length]}</span>)
  }

  return (
    <>
      <h1 className="title">mimir</h1>
      <div className="backwrap gradient">
        <div className="back-shapes">
          {backshape}
        </div>
      </div>
      <p className="downarrow">v</p>
      <div className="description">
        <h2>Mimir is a </h2>
      </div>
    </>

  );
}
