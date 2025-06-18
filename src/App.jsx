import './App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/Footer";
import CustomRoutes from "./routes/Routes";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <CustomRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
