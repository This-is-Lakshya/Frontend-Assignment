import { useEffect, useState } from "react";
import { Button, ButtonGroup, FormControl, FormLabel, HStack, Tooltip } from "@chakra-ui/react";
import { useFormContext } from "../../FormContext";
import './fieldComponents.css';

const RadioField = ({ schema }) => {
  const {  updateFormData} = useFormContext();
  const [selectedTab, setSelectedTab] = useState(schema.validate.defaultValue);

  useEffect(() => {
    updateFormData(schema.jsonKey, schema.validate.defaultValue);
  }, []);

  const handleTabChange = (tabValue) => {
    setSelectedTab(tabValue);
    updateFormData(schema.jsonKey, tabValue);
  };

  return (
    <FormControl
      isRequired={schema.required}
      key={schema.jsonKey}
      marginTop={"5"}>
      <FormLabel>
        {schema.label}
        {schema.description && (
          <Tooltip label={schema.description}>
            <span
              style={{
                marginLeft: "6px",
                backgroundColor: "#a6a6e6",
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "25px",
              }}>
              i
            </span>
          </Tooltip>
        )}
      </FormLabel>

      <ButtonGroup
        size="sm"
        isAttached
        variant="outline"
        value={selectedTab}
        onChange={(value) => handleTabChange(value)}>
        <HStack className="radioFieldArea" spacing={1}>
          {schema.validate.options.map((option) => (
            <Button
              key={option.value}
              id={option.value}
              width="100vh"
              onClick={() => handleTabChange(option.value)}
              colorScheme={selectedTab === option.value ? "blue" : "gray"}>
              {option.label}
            </Button>
          ))}
        </HStack>
      </ButtonGroup>
    </FormControl>
  );
};

export default RadioField;