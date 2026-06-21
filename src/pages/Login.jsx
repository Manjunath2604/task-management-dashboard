import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {   

    if (
      email === "admin@gmail.com" &&
      password === "1234"
    ) {
      localStorage.setItem
      ("isLoggedIn",
         "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }

  };

  return (
    <div>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;