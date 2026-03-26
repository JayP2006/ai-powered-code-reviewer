import { useState,useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import './App.css'
import rehypehighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import Markdown from "react-markdown"
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [code, setcode] = useState(`function sum(){
  return 1+1;
}`);
const [review, setreview] = useState(``);

  useEffect(() => {
    prism.highlightAll()
  });
 async function reviewcode(){
    const response=await axios.post('https://apbackend-6vg6.onrender.com/ai/get-review',{code})
    setreview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
         <Editor
              value={code}
              onValueChange={code => setcode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color:"white"
              }}
            />
          </div>
          <div onClick={reviewcode} className="review">Review code</div>
        </div>
        <div className="right"><Markdown
        rehypePlugins={[rehypehighlight]}
        >{review}</Markdown></div>
      </main>
    </>
  )
}


export default App
