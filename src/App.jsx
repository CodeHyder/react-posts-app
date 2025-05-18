import { useUser } from "./context/UserContext";
import Login from "./pages/Login";
import Posts from "./pages/Posts";

function App() {
  const { username, logout  } = useUser(); 

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
