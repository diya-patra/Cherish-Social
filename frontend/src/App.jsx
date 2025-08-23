import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import Reels from "./pages/Reels.jsx";
import { Loading } from "./components/Loading.jsx"

// Context
import { UserData } from "./context/UserContext.jsx";
import { PostContextProvider } from "./context/PostContext.jsx";

// Components
import NavigationBar from "./components/NavigationBar.jsx";
import NotFound from "./components/NotFound.jsx";
import UserAccount from "./pages/UserAccount.jsx";

const App = () => {
  const { loading, isAuth, user } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* ✅ Wrap everything inside PostContextProvider */}
          <PostContextProvider>
            <Routes>
              <Route path="/" element={isAuth ? <Home /> : <Login />} />
              <Route
                path="/account"
                element={isAuth ? <Account user={user} /> : <Login />}
              />
              <Route
                path="/user/:id"
                element={isAuth ? <UserAccount user={user} /> : <Login />}
              />
              <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
              <Route
                path="/register"
                element={!isAuth ? <Register /> : <Home />}
              />
              <Route path="/reels" element={isAuth ? <Reels /> : <Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* ✅ Show navbar only if logged in */}
            {isAuth && <NavigationBar />}
          </PostContextProvider>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
