import React, { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import {
  numbers,
  lowerCaseLettters,
  upperCaseLetters,
  specialCharacters,
} from "./characters";

// toast.configure();

function App() {
  const [password, setPassword] = useState("");
  // const [copyBtnText, setCopyBtnText] = useState("COPY");
  const [passwordLength, setPasswordLength] = useState(14);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers,  setIncludeNumbers] = useState   (true);
  const [includeSymbols,  setIncludeSymbols] = useState   (true);

  const copyBtn = useRef();

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      alert("You must select at least one option");
      return;
    }

    let characterList = "";
    if (includeLowercase) {
      characterList += lowerCaseLettters;
    }

    if (includeUppercase) {
      characterList += upperCaseLetters;
    }

    if (includeNumbers) {
      characterList += numbers;
    }

    if (includeSymbols) {
      characterList += specialCharacters;
    }

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length-1;
   if(passwordLength>14){
    setPasswordLength(14)
   }
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = getRandomIndex(characterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  };

  const getRandomIndex = (passLength) => {
    return Math.round(Math.random() * passLength);
  };

  useEffect(() => {
    handleGeneratePassword();
    setTimeout(() => {
      handleGeneratePassword();
    }, 3000);
  }, [includeUppercase,
    includeLowercase,
    includeNumbers,  
    includeSymbols, passwordLength ]);

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");


    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  
  const handleCopyPassword = (e) => {
    copyToClipboard();
    

  };

  return (
    <div className="App">
      <div className="App_container">
        <h2 >Password Generator</h2>

        <div >
          <span>{password}</span>
          <button
            className=""
            onClick={handleCopyPassword}
            ref={copyBtn}
          >
            copy
          </button>
        </div>
       

        <div >
          <label htmlFor="password-length">Password length</label>
          <input
            name=""
            id=""
            type="number"
            max="14"
            min="6"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="">
          <label htmlFor="uppercase-letters">Include uppercase letters</label>
          <input
            id=""
            name=""
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
        </div>

        <div className="">
          <label htmlFor="lowercase-letters">Include lowercase letters</label>
          <input
            id=""
            name="lowercase-letters"
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
        </div>

        <div >
          <label>Include Numbers</label>
          <input
          
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
        </div>

        <div >
          <label htmlFor="include-symbols">Include Symbols</label>
          <input
            name="include-symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>

        <button className="" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
