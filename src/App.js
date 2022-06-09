import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./layout/Layout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import MyProfile from "./pages/MyProfile";
import NatterDetails from "./pages/Natter/NatterDetails";
import { useState, useEffect } from "react";
import UserProfile from "./pages/UserProfile";
import jsCookies from "js-cookies";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
            exact
          />
          <Route path="/about" element={<About />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route exact path="/natter/:id" element={<NatterDetails />} />
          <Route exact path="/userProfile/:id" element={<UserProfile />} />
          <Route element={<NotFound />} />
        </Routes>
      </Container>
    </Layout>
  );
};

export default App;
