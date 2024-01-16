import { createContext, useContext, useState } from "react";

// context for managing data and func'
const FormContext = createContext();

// custom hook for FormContext
export const useFormContext = () => {

  const context = useContext(FormContext);

  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }

  return context;
};

// FormContextProvider
export const FormContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  
  const updateFormData = (jsonKey, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [jsonKey]: value,
    }));
  };
  
  const handleResetData = () => {
    setFormData({});
  };
  
  // pass the form data and functions as values to the context
  const contextValue = {
    formData,
    setFormData,
    updateFormData,
    handleResetData,
  };
  
  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};