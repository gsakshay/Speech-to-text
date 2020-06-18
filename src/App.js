import React,{useState} from 'react';
import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";

function App() {

  const [ text,updateText ] = useState("");

  const speechToTextFn = () => {

    fetch("http://localhost:3002/api/speech-to-text/token")
      .then( function (response) {         
        return response.json();
      } )
      .then(function (token) {

        let stream = recognizeMic(
          Object.assign(token, {
            objectMode: true, // send objects instead of text
            format: true, // optional - performs basic formatting on the results such as capitals an periods
          })
        );

        stream.on("data", function (data) {
          updateText(() => {
            return data.results[0].alternatives[0].transcript;
          });
          
        });

        stream.on("error", function (err) {
          console.log(err);
        });
      })
      
      .catch(function (error) {
        console.log(error);
      });
      
  };
  return (
    <div className="App">
      <header style={{ textAlign: "center" }}>
        <h1>Speech to text</h1>
      </header>
      <div style={{ textAlign: "center" }}>
        <button style={{}} onClick={speechToTextFn}>
         Start recording 
        </button>
        
        <div>
          <textarea
            placeholder="Your words"
            cols="45"
            rows="10"
            readOnly={true}
            value={text}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
