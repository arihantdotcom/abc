import React, { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  // ref hook
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      let rand = Math.floor(Math.random() * str.length);
      pass += str.charAt(rand);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password]);

  const handleGeneratePasswordClick = () => {
    generatePassword();
  };


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-1 px-4 my-8 text-orange-400  bg-slate-800">
        <h1 className="text-white text-center mb-6 ">GERNATE YOUR PASSWORD</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleGeneratePasswordClick}
            >
              Generate Password
            </button>
            <input
              type="range"
              min="6"
              max="18"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>Length{length}</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
