import { useContext } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import * as React from "react";
import { Box, Stack, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import { CustomeButton, SubmitButton } from "./button";
import { StepperContext } from "./stepper/stepperContext";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
  },
}));

let highestIndex = 0;

const ScrollableTabs = ({
  tabs,
  formik,
  isLastStep,
  disabled,
  hideButton,
  setStep,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { value, setValue, handleChange } = useContext(StepperContext);

  // console.log("dkhhfasdjhf", formik);
  const checkError = () => {
    let selectTab = [];
    if (tabs) {
      tabs.map((element, index) => {
        if (element?.fields && formik?.errors) {
          const isEquipmentTranster = formik?.errors?.equipment_transfers;
          const errors = Object.keys(formik.errors);
          element.fields.map((item, i) => {
            if (errors.includes(item)) {
              // set default tab for error
              selectTab.push(index);
            } else if (isEquipmentTranster) {
              if (isEquipmentTranster[element.fields[i]]) {
                selectTab.push(index);
              }
            }
          });
        }
      });
    }

    if (selectTab && selectTab.length) {
      setValue(selectTab[0]);
      if (selectTab[0] >= highestIndex) {
        highestIndex = selectTab[0];
      }
    }
  };

  React.useEffect(() => {
    if (formik.isSubmitting) {
      checkError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik]);

  const _handleBack = () => {
    setValue(value - 1);
  };
  let steps = 100 / setStep;
  let finalValue = (value + 1) * steps;

  return (
    <>
      <TabContext value={value}>
      <Box textAlign="right" mb={1}>
        <Typography color="primary" fontSize={14} fontWeight={500} >Step {value+1}<Typography ml={0.7} component="span" color="grey" fontSize={14} fontWeight={500}>Of 3</Typography></Typography>
      </Box>
        <Box>
          <BorderLinearProgress variant="determinate" value={finalValue} />
        </Box>
        <br />
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel sx={{p:0,my:2}} key={`tab${index}`} value={index}>
              {tab.component}
            </TabPanel>
          ))}
      </TabContext>
      {!hideButton && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: "20px" }}
            className='suscribeTable_box_stack_responsive'
          >
            {/* {value !== 0 && ( */}
            <Box sx={{width:"20%"}}>
              <CustomeButton
                color="primary"
                onClick={() => _handleBack()}
                variant="outlined"
                title="Cancel"
                disabled={value <= 0}
              />
            </Box>
            {/* )} */}

            <Box sx={{width:"auto"}}>
              <SubmitButton
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || disabled}
                variant="contained"
                title={
                  isLastStep ? (id === "create" ? "Post Job" : "Update") : "Next"
                }
              />
            </Box>
          </Stack>
        </>
      )}
    </>
  );
};

ScrollableTabs.DefaultProps = {
  tabs: [],
};

ScrollableTabs.propTypes = {
  tabs: PropTypes.array,
  formik: PropTypes.object,
  isLastStep: PropTypes.any,
  hideButton: PropTypes.any,
  disabled: PropTypes.any,
  value: PropTypes.any,
};

export default ScrollableTabs;
