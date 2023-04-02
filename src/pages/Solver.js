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
  const [output, setOutput] = useState([]);

  let key = 1;
  let output_render = [];
  premises.forEach((p) => {
    if(key < premises.length) {
      output_render.push(<tr className="tableRow">
        <td key={key} className="tableCell">{key}</td>
        <td key={key} className="tableCell Line">{p}</td>
        <td key={key} className="tableCell">P</td>
        <td key={key} className="tableCell"></td>
      </tr>
      );
    } else {
      output_render.push(<tr className="tableRow">
        <td key={key} className="tableCell">{key}</td>
        <td key={key} className="tableCell Bottom">{p}</td>
        <td key={key} className="tableCell">P</td>
        <td key={key} className="tableCell">⊢{target}</td>
      </tr>
      );
    }
    key += 1;
  });

  output.forEach(o => {
    if(o[1].length === 1) {
      let firstIndex = premises.indexOf(o[1][0]) + 1;
      if(firstIndex === 0) {
        for(let i = 0; i < output.length; i++) {
          if( output[i][2] === o[1][0]) {
            firstIndex = i + premises.length + 1;
          }
        }
      }
      output_render.push(<tr className="tableRow">
        <td key={key} className="tableCell">{key}</td>
        <td key={key} className="tableCell Line">{o[2]}</td>
        <td key={key} className="tableCell">{firstIndex} {o[0]}</td>
        <td key={key} className="tableCell"></td>
      </tr>);
    } else {
      let firstIndex = premises.indexOf(o[1][0]) + 1;
      if(firstIndex === 0) {
        for(let i = 0; i < output.length; i++) {
          if( output[i][2] === o[1][0]) {
            firstIndex = i + premises.length + 1;
          }
        }
      }
      let secondIndex = premises.indexOf(o[1][1]) + 1;
      if(secondIndex === 0) {
        for(let i = 0; i < output.length; i++) {
          if( output[i][2] === o[1][1]) {
            secondIndex = i + premises.length + 1;
          }
        }
      }
      output_render.push(<tr className="tableRow">
        <td key={key} className="tableCell">{key}</td>
        <td key={key} className="tableCell Line">{o[2]}</td>
        <td key={key} className="tableCell">{firstIndex},{secondIndex} {o[0]}</td>
        <td key={key} className="tableCell"></td>
      </tr>);
    }

    key += 1;
  })

  return (
    <div className="container">
      <p>Input your premises and target statement into the boxes below in the following format: </p>

      <div className="editorbbox">
        <p className="editorbbox">((¬A ∨ B) ∨ C)</p>
      </div>

      <p>All premises and target statments must be contained in a set of parenthesis.</p>

      <div className="editorbbox">
        <h4>premises:</h4>
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
      </div>

      <div className="editorbbox">
        <h4>target:</h4>
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
      </div>

      <button className="menubutton" onClick={ () => {
          if(premises.length > 0 && target.length > 0) {
            fetch('https://32i8x8na33.execute-api.us-east-1.amazonaws.com/dev/api', {
            method: 'POST',
            body: JSON.stringify({
              "premises": premises,
              "target": target
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            }).then((response) => response.json())
            .then((data) => {
              setOutput(data);
              console.log(data);
            })
            .catch((err) => {
              console.log(err.message);
          });
          }

          // const data = [["∧E", ['( K ∧ S )'], "K"],
          //               ["∧E", ['( K ∧ S )'], "S"],
          //               ["→E", ['( S → ¬ N )', 'S'], "¬ N"],
          //               ["→E", ['( ¬ N → ( K → G ) )', '¬ N'], "( K → G )"],
          //               ["→E", ['( K → G )', 'K'], "G"]]
          // setPremises(["( A → B )", "( S → ¬ N )", "( K ∧ S )", "( ¬ N → ( K → G ) )"])
          // setOutput(data);
          // setTarget("G")
      }}>generate proof</button>

      <div className="tableContainer">
        <table className="table">
          <tbody className="tableBody">
            {output_render}
          </tbody>
        </table>
      </div>
    </div>
  );
}
