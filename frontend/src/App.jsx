import { useState } from 'react'
import './App.css'
import { toast } from 'react-toastify';

function App() {
   const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const showToast = (msg) => {

    toast.error(msg)
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
          UNKNOWN_SYMBOL: `${type} text contains unknown symbols`
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
       <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} cols={50} />
       <div>
        <button className='master_button encodeButon' onClick={() => handleAction('encode')}>Encode</button>
      <button className='master_button decodeButton' onClick={() => handleAction('decode')}>Decode</button>
       </div>
       <textarea value={output}  rows={10} cols={50} readOnly />
 
    </>
  )
}

export default App
