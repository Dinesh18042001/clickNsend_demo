import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const StepperContext = createContext({});

function StepperProvider({ children }) {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState(0);
  const [tagLength, setTagLength] = useState(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTagsLength = (tabs) => {
    setTagLength(tabs?.length - 1);
  };

  useEffect(() => {
    setValue(0);
  }, []);

  useEffect(() => {
    setValue(0);
  }, [id]);

  return (
    <StepperContext.Provider
      value={{ value, setValue, handleChange, getTagsLength, tagLength }}
    >
      {children}
    </StepperContext.Provider>
  );
}

export { StepperProvider, StepperContext };
