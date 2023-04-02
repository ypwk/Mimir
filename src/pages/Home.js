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
        <h2 className="para">
          Named after the Norse god of Wisdom, Mimir is an automatic proof engine built for use with symbolic logic.
        </h2>

        <h2 className="para">
          Confused on where to start your symbolic logic proof? Need to study for a symbolic logic test? Mimir can help!
        </h2>

        <h2 className="para">
          Mimir is hosted using Free Tier AWS Amplify, written with a Python AWS Lambda and AWS API Gateway backend and React frontend.
        </h2>

        <div className="para"></div>
      </div>
    </>

  );
}
