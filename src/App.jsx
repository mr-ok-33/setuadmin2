import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import { Home, NotFound } from "./Pages";
import { Brand, Category, Drug, DrugCategory } from "./Pages/DrugDirectory";
import { Company, Jobs } from "./Pages/Jobs";
import { Sidebar } from "./Components";
import { ToastContainer } from "react-toastify";

const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/brand", element: <Brand /> },
  { path: "/drug", element: <Drug /> },
  { path: "/category", element: <Category /> },
  { path: "/drug-category", element: <DrugCategory /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/company", element: <Company /> },
  { path: "*", element: <NotFound /> },
];

const App = () => {
  return (
    <Router>
      <main className="app_body">
        <Sidebar />
        <div className="app_body--right">
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </main>
      <ToastContainer />
    </Router>
  );
};

export default App;
