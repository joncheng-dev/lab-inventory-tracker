import React, { useState } from "react";
import styled from "styled-components";
import { AddItemsForm, Item } from "../types";
import { Box, Button, Divider, FormControlLabel, Grid, Stack, TextField, useTheme } from "@mui/material";
import { tokens } from "../themes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

//#region styles
const ReusableFormContainer = styled.div`
  padding-left: 50px;
  padding-top: 25px;
`;

const InputColumnContainer = styled.div`
  float: left;
  width: 100%;
`;
//#endregion styles

type FormProps = {
  onFormSubmit: (data: AddItemsForm) => Promise<void>;
};

// Take user information
// 1. ItemType - must be selected from an existing list
//    if type does not exist, message says that it must be added first.
// 2. Quantity - number input field
//    Up to 10 at a time?

// Submit button
// on submit, uses quantity to create X number of items of itemType.
// How to make Firebase call to create multiple docs?

export default function ItemForm(props: FormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { onFormSubmit } = props;
  const [formData, setFormData] = useState<AddItemsForm>({
    itemType: "",
    quantity: 1,
  });

  const validationSchema = yup.object().shape({
    itemType: yup.string().required("Required"),
    // prettier-ignore
    quantity: yup.number()
    .integer("Must be a whole number")
    .min(1, "Must be greater than one")
    .max(10, "Must be 10 or less")
    .required("Required"),
  });

  const { itemType, quantity } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name !== "quantity") {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: parseInt(e.target.value, 10) || 0,
      }));
    }
  };

  const handleSubmit = (values: AddItemsForm) => {
    console.log("ItemForm, handleSubmit, values: ", values);
    onFormSubmit(values);
  };

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <ReusableFormContainer>
        {/* prettier-ignore */}
        <Formik
          initialValues={formData}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
          <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
            <Grid container spacing={2}>
              <Grid xs={7}>
                <Box
                  component="div"
                  sx={{
                    "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                  }}
                >
                  <h2>Add New Item</h2>
                  <Divider />
                  <br />
                  <InputColumnContainer>
                    {/* prettier-ignore */}
                    <Field 
                      as={TextField}
                      name="itemType"
                      label="Item Type"
                      helperText={<ErrorMessage name="itemType" />}
                      onChange={handleInputChange}
                      value={itemType}
                    />
                    <br />
                    <Field
                      as={TextField}
                      name="quantity"
                      label="Item Quantity"
                      helperText={<ErrorMessage name="quantity" />}
                      onChange={handleInputChange}
                      type="number"
                      value={quantity}
                    />
                    <br />
                  </InputColumnContainer>
                </Box>
              </Grid>
            </Grid>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                "Add Items to Inventory"
              </Button>
            </Stack>
            <br />
            </Box>
          </Form>
        </Formik>
      </ReusableFormContainer>
    </Box>
  );
}
