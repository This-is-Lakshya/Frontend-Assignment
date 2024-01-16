import React,{ useState } from "react";
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import { useFormContext } from "../../FormContext";
import InputField from "../../components/FieldComponent/InputField";
import FormComponent from "../../components/FieldComponent/FormComponent";
import SwitchField from "../../components/FieldComponent/SwitchField";
import SelectField from "../../components/FieldComponent/SelectField";
import RadioField from "../../components/FieldComponent/RadioField";
import toastOptions from '../../components/Toast/toastOptions';
import ToggleSwitch from "../../components/FieldComponent/ToggleSwitch";
import 'react-toastify/dist/ReactToastify.css';
import './formArea.css';


const DynamicForm = ({ formSchema }) => {
  
  const { formData, updateFormData } = useFormContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    
    // Perform custom validation here if needed
    const isFormValid = formSchema.every((field) => {
      if (field.validate?.required) {
        return formData[field.jsonKey] !== undefined && formData[field.jsonKey] !== "";
      }
      return true;
    });

    if (isFormValid) {
      handleOpenModal();
    } else {
      // error if fields are empty on submiting
      toast.error("Please Enter all fields", toastOptions);
    }
  };

  const [toggleField, setToggleField] = useState(false);
  const [toggleField2, setToggleField2] = useState(false);
   
  const renderJsonElements = (schema) => {
    return (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>JSON to be sent to the Backend</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="submitModal">
            <Box>
            {
              Object.entries(schema).map(([key, value]) => (
                <Text key={key} marginTop={2}>
                  <strong>{key}: </strong>
                  {JSON.stringify(value, null, 2)}
                </Text>
              ))
            }
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  

  return (
    <>
        <form>
          {formSchema.map((schema, index) => {
            return (
              <React.Fragment key={index}>
                {
                  schema.uiType === "Input" && (
                    schema.validate.required && 
                      <InputField
                      schema={schema}
                      key={schema.sort}
                      updateFormData={updateFormData} />
                    
                  )
                }

                {
                  schema.uiType === "Switch" && (
                    <SwitchField
                      schema={schema}
                      key={schema.sort}
                      updateFormData={updateFormData}
                    />
                  )
                }

                {
                  schema.uiType === "Select" && (
                    (schema.validate.required !== true && toggleField) &&
                    <SelectField
                      schema={schema}
                      key={schema.sort}
                      updateFormData={updateFormData}
                    />
                  )
                }

                {
                  schema.uiType === "Radio" && (
                    <RadioField
                      schema={schema}
                      key={schema.sort}
                      updateFormData={updateFormData}
                    />
                  )
                }

                {
                  schema.uiType === "Group" && (
                    <FormComponent
                      schema={schema}
                      key={schema.sort}
                      updateFormData={updateFormData}
                      toggleField={toggleField2}
                    />
                  )
                }
              </React.Fragment>
            );
          })}
          {
            formSchema.length > 0 && (
              <>
                <ToggleSwitch setToggleField={setToggleField2} />
                <Box style={{display: "flex", marginTop: "1vmax", borderTop: "1.5px solid rgb(200, 200, 200)", alignItems: "center", justifyContent: "flex-end"}}>
                  <ToggleSwitch setToggleField={setToggleField} />
                  <Button Button colorScheme='blackAlpha' marginTop={"1vmax"} onClick={handleFormSubmit} >Submit</Button>
                  {renderJsonElements(formData)}
                </Box>
              </>
            )
          }
        </form>

        <ToastContainer />
    </>
  );
};

export default DynamicForm;