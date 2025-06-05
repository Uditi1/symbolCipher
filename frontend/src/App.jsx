import { useState } from 'react'
import './App.css'

function App() {
   const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const showToast = (msg) => {

    alert(msg); 
  };

  const handleAction = async (type) => {
    try {
      const res = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(type === 'encode' ? { text: input } : { encoded: input })
      });
      const data = await res.json();
      if (!res.ok) {
        const messages = {
          INPUT_TOO_LONG: "Message exceeds 280 characters.",
          UNSUPPORTED_CONTROL_CHAR: "Input contains unsupported control characters.",
          UNKNOWN_SYMBOL: "Encoded text contains unknown symbols."
        };
        showToast(messages[data.error] || "Unknown error");
      } else {
        setOutput(type === 'encode' ? data.encoded : data.text);
      }
    } catch (err) {
      showToast("Server unreachable. Please try again.");
    }
  };


  return (
    <>
      <h1>Text Encoder/Decoder</h1>
       <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} />
       <div>
        <button onClick={() => handleAction('encode')}>Encode</button>
      <button onClick={() => handleAction('decode')}>Decode</button>
       </div>
      <p>{output}</p>
 
    </>
  )
}

export default App
