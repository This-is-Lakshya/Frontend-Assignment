import { useState } from "react";
import { Box, Button, Grid, GridItem, Textarea, useMediaQuery } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { useFormContext } from "../../FormContext";
import DynamicForm from "./DynamicForm";
import toastOptions from '../../components/Toast/toastOptions';
import "react-toastify/dist/ReactToastify.css";
import "./formArea.css";

const FormArea = () => {
  const [inputValue, setInputValue] = useState();
  const [formSchema, setFormSchema] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const leftSideStyles = isMobile
    ? { height: "50vh", overflowY: "scroll" }
    : { height: "88vh" } ;

  const rightSideStyles = isMobile
    ? { height: "50vh", overflowY: "scroll" }
    : { height: "87.5vh", overflowY: "scroll" } ;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    try {
      const parsedFields = JSON.parse(e.target.value);
      if (Array.isArray(parsedFields)) {
        setFormSchema(parsedFields);
      }
    } catch (error) {
      toast.error("Invalid Form Schema", toastOptions);
    }
  };

  const { handleResetData } = useFormContext();

  const handleReset = () => {
    setFormSchema([]);
    setInputValue("");
    handleResetData();
    toast.success("Form Reset Successfully", toastOptions);
  };

  return (
    <>
      <Grid className="outBox" templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={6}>
        <GridItem {...leftSideStyles} className="JsonInputArea">
          <Textarea 
            value={inputValue}
            placeholder="Paste your UI-Schema here..."
            onChange={handleInputChange}
            resize="none" />
        </GridItem>

        <GridItem {...rightSideStyles} className="formOutputArea">
          {formSchema.length > 0 && (
            <>
              <Box>
                <DynamicForm formSchema={formSchema} />
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  
                  
                  <Button
                    Button
                    colorScheme="blackAlpha"
                    marginTop="0.5vmax"
                    variant="outline"
                    onClick={handleReset}>
                      Cancel
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </GridItem>
      </Grid>
      
      <ToastContainer />
    </>
  );
};

export default FormArea;