import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import BeforeLoginRoute from "./components/BeforeLoginRoute";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import PostDetail from "./pages/PostDetail";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route element={<Posts />} path="/" />
        <Route element={<BeforeLoginRoute component={Login} />} path="/login" />
        <Route
          element={<BeforeLoginRoute component={Register} />}
          path="/register"
        />

        <Route
          element={<ProtectedRoute component={CreatePost} />}
          path="/create-post"
        />
        <Route
          element={<ProtectedRoute component={CreatePost} />}
          path="/edit-post/:id"
        />
        <Route element={<PostDetail />} path="/posts/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
