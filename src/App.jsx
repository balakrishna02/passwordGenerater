/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const [isClicked, setIsClicked] = useState(false);

  const passwordRef = useRef(null)


  const passswordgenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllow) str += "1234567890"
    if(charAllow) str += "!@#$%^&*"

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllow, charAllow, setPassword]) //this setPassword is just to optimize it (ni do toh bhi chalega)



  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select(); 
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password])
    

//fisrt sbse phele yehi run hoga
  useEffect(() => {
    passswordgenerator()
  }, [length, numberAllow, charAllow, passswordgenerator])



  // const clickChangeColor = useCallback(() => {
  //   const btn = document.getElementById("mybutton")
  //   // btn.style.backgroundColor = "green";
  //   setTimeout(() => {
  //     setIsClicked(false); // Revert back after 200ms
  //   }, 200);
  // })



  // function MyButton() {
  //   const [isClicked, setIsClicked] = useState(false);
  


  return (
    <>
    
    <div className="w-full max-w-md mx-auto px-4 py=6 my-9 bg-gray-800 text-green-500 text-center rounded-lg">
      
      <h1 className='my-8'>password generater</h1>
      
      
      <div className="flex shadow rounded-lg overflow-hidden mb-4 text-orange">
        <input 
          type="text"
          value={password} 
          className="outline-none w-full py-3 px-4"
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button id="mybutton"
          // onClick={ () => {copyToClipBoard(); clickChangeColor();}}
          onClick={copyToClipBoard}
          className='bg-blue-700 text-white px-3 py-1.5 shrink-0' >
          copy text
          </button>
      </div>


      <div className='flex gap-x-2'>


        <div className='flex gap-x-1'>
          <input 
            type="range" 
            min ={8}
            max={100}
            value={length}
            className='cursor-pointer'  
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >Length: {length}</label>
        </div>


        <div className='flex  gap-x-1'>
          <input 
            type="checkbox" 
            defaultValue={numberAllow}
            id="numberinput"
            onChange={() => {
              setNumberAllow((prev) => !prev)
            }}
          />

          <label htmlFor="numberinput">Number</label>
        </div>


        <div className='flex  gap-x-1'>
          <input 
            type="checkbox" 
            defaultValue={charAllow}
            id="charinput"
            onChange={() => {
              setCharAllow((prev) => !prev)
            }}
          />
          <label htmlFor="charinput">characters</label>
        </div>

      </div>

    </div>
    </>
  )
}

export default App
