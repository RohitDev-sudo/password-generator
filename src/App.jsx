import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setlength] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  const generatepassword = useCallback (()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz"
     if (numAllowed) 
      str += "0123456789"
     if (charAllowed) 
      str += "!@#$%&*"
     
     for(let i = 0; i < length; i++){
        pass += str.charAt(Math.floor(Math.random() * str.length));
      }

     setPassword(pass);
  } ,[length,numAllowed,charAllowed])
  useEffect(()=>{
    generatepassword()
  },[length, numAllowed, charAllowed, generatepassword])
  
  const copyPasswordToClipBoard = ()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }
  const passwordRef = useRef(null)
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
           />
           <button 
           onClick={copyPasswordToClipBoard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
           >copy
           </button>
        </div>
        <div
        className='flex text-sm gap-x-2'>
          <div
          className='flex items-start gap-x-1'>
            <input 
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setlength(e.target.value)}
            name="" 
            id="" />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div
          className='flex items-start gap-x-1'
          >
            <input 
            type="checkbox"
            checked={numAllowed}
            onChange={()=>{
              setNumAllowed((prev)=>!prev)
            }}
            name="" 
            id="" />
            <label htmlFor="number">Number</label>
          </div>
           <div
          className='flex items-start gap-x-1'
          >
            <input 
            type="checkbox"
            checked={charAllowed}
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            name="" 
            id="" />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
