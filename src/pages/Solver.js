import React, { useEffect, useState } from "react";

import Editor from "../components/Editor";

const validityRe = new RegExp("^[A-Z ∨∧→↔¬()]*$");
function checkValidity(input) {
  if(validityRe.test(input)) {
    const tokens = input.split('');
    let pos = 0;

    function consume(char) {
      if (char.indexOf(tokens[pos]) > -1) {
        pos++;
        return true;
      }
      return false;
    }

    function un_connective() {
      return consume('¬');
    }

    function sentence() {
      const validSentences = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '?']);
      return validSentences.has(tokens[pos++]);
    }

    function expression() {
      if (un_connective()) {
        return expression();
      } else if (consume('(')) {
        if (expression() && consume('∨∧→↔') && expression() && consume(')')) {
          return true;
        }
        return false;
      } else {
        return sentence();
      }
    }

    return expression() && pos === tokens.length;
  }
}

export default function Solver() {
  const [premises, setPremises] = useState([]);
  const [target, setTarget] = useState("");

  let premise_render = [];
  let key = 0;
  premises.forEach((p) => {
    premise_render.push(<p key={key}>{p}</p>);
    key += 1;
  });

  return (
    <>
      <h3>Input Premises:</h3>
      <Editor
        enterCallback={(editor_view) => {
          let content = editor_view.state.doc.textContent.replace(/\s+/g, '').trim();
          if (checkValidity(content)) { // if valid
            // inflate string
            content = content.split('').join(' ')

            if (!premises.includes(content)) { // if premises does not include content
              // delete content of editor
              let tr = editor_view.state.tr
              tr.delete(0, editor_view.state.doc.textContent.length + 1)
              editor_view.dispatch(tr)

              // add new premise to premises
              setPremises((premises) => {
                let new_premises = premises.map((x) => x);
                new_premises.push(content);
                return new_premises;
              });
            }
          }
        }}
      />
      <h3>Input Target:</h3>
      <Editor
        enterCallback={(editor_view) => {
          let content = editor_view.state.doc.textContent.replace(/\s+/g, '').trim();
          if (checkValidity(content)) { // if valid
            // inflate string
            content = content.split('').join(' ')

            // delete content of editor
            let tr = editor_view.state.tr
            tr.delete(0, editor_view.state.doc.textContent.length + 1)
            editor_view.dispatch(tr)

            // set new target
            setTarget(content);
          }
        }}
      />

      <h3>Premises: {premise_render}</h3>

      <h3>Target: {target}</h3>

      <button className="menubutton" onClick={ () => {
          fetch('https://32i8x8na33.execute-api.us-east-1.amazonaws.com/dev/api', {
            method: 'POST',
            body: JSON.stringify({
              premises: premises,
              target: target
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
           },
          }).then((response) => response.json())
          .then((data) => {
             console.log(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
      }}>Generate Proof!</button>

      <h3>Output:</h3>
    </>
  );
}
