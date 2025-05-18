// src/pages/Login.jsx
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";

function Login() {
  const [input, setInput] = useState("");
  const { setUsername } = useUser();

  const handleEnter = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setUsername(trimmedInput);
      localStorage.setItem("username", trimmedInput);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-[600px] sm:min-w-[500px] flex flex-col justify-between p-6 bg-white border border-[#CCC] rounded-[16px]">
        <h1 className="text-[22px] font-bold font-roboto text-black mb-4">
          Welcome to CodeLeap network!
        </h1>

        <div>
          <p className="text-[16px] text-black mb-2">Please enter your username</p>
          <input
            type="text"
            className="w-full h-[32px] px-3 mb-4 border border-[#777] rounded-[8px] bg-white text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="John doe"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleEnter}
              disabled={!input.trim()}
              className="w-[111px]"
            >
              ENTER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
