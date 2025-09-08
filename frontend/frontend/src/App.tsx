import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
        <Link to="/posts">Posts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
