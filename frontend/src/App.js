import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <h2>this is the new content</h2>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
