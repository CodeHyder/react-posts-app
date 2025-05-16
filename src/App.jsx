// src/App.jsx
import { useUser } from "./context/UserContext";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
// import Main from "./pages/Main"; // vamos criar depois

function App() {
  const { username } = useUser();

  return (
    <>
      {username ? (
        <Posts />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
