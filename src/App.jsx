import React from "react";
import Header from "./components/Header/Header.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { FormContextProvider } from "./FormContext.js";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import FormArea from "./pages/FormComponent/FormArea.jsx";

const App = () => {
  return (
    <>
      <Header />
      <FormContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/createForm" element={<FormArea />} />
          </Routes>
        </BrowserRouter>
      </FormContextProvider>
    </>
  );
};

export default App;