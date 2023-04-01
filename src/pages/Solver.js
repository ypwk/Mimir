import React, { useState } from "react";

import Editor from "../components/Editor";


export default function Solver() {
  const [premises, setPremises] = useState([]);

  let premise_render = [];
  let key = 0;
  premises.forEach((p) => {
    premise_render.push(<p key={key}>{p}</p>);
    key += 1;
  });

  return (
    <>
      <h3>Input Target:</h3>
      <Editor
        enterCallback={() => {
          console.log("fhajisd");
        }}
      />

      <h3>Input Premises:</h3>
      <Editor
        enterCallback={(editor_view) => {
          const content = editor_view.state.doc.textContent;
          if (content !== "") {
            console.log(editor_view)
            let tr = editor_view.state.tr
            tr.delete(0, content.length + 1)
            editor_view.dispatch(tr)
            console.log(editor_view.state.doc.textContent)
            setPremises((premises) => {
              let new_premises = premises.map((x) => x);
              new_premises.push(content);
              return new_premises;
            });
          }
        }}
      />

      <button className="menubutton">Proof</button>

      {premise_render}

      <h3>Output:</h3>
    </>
  );
}
