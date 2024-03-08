import React, { useState } from "react";
import styled from "styled-components";
import { AddItemsForm, ItemType } from "../types";
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { tokens } from "../themes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

//#region styles
const ReusableFormContainer = styled.div`
  padding-left: 50px;
  padding-top: 25px;
`;

//#endregion styles

type FormProps = {
  itemTypeList: ItemType[];
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
  const { itemTypeList, onFormSubmit } = props;
  console.log("ItemForm, itemTypeList: ", itemTypeList);

  const [formData, setFormData] = useState<AddItemsForm>({
    type: "",
    displayName: "",
    quantity: 1,
  });

  const validationSchema = yup.object().shape({
    type: yup.string().required("Required"),
    // prettier-ignore
    quantity: yup.number()
    .integer("Must be a whole number")
    .min(1, "Must be greater than one")
    .max(10, "Must be between 1 and 10")
    .required("Required"),
  });

  const { type, quantity } = formData;

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: ItemType | null, reason: AutocompleteChangeReason) => {
    if (reason === "selectOption") {
      setFormData((prevData) => ({
        ...prevData,
        type: value?.type || "",
        displayName: value?.displayName || "",
      }));
    } else if (reason === "clear") {
      setFormData((prevData) => ({
        ...prevData,
        type: "",
        displayName: "",
      }));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.name === "quantity" ? parseInt(e.target.value, 10) || 0 : e.target.value,
    }));
  };

  const handleSubmit = (values: AddItemsForm) => {
    console.log("ItemForm, handleSubmit, values: ", values);
    onFormSubmit(values);
  };

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }} mr={0.5}>
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
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12}>    
                <h2>Add Items to Inventory</h2>
              </Grid>
              <Grid item xs={7}>
                <Autocomplete
                  // disablePortal
                  options={itemTypeList}
                  onChange={handleAutocompleteChange}
                  getOptionLabel={(option) => option.displayName || ''}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.displayName}
                      <br />
                      {option.type} 
                    </Box>
                  )}
                  renderInput={(params) => <TextField {...params} label="Item Type" />}
                />
                </Grid>
                <Grid item xs={5}>
                  <FormControl sx={{ width: 300 }}>
                  <Field
                    as={TextField}
                    name="quantity"
                    label="Item Quantity"
                    helperText={<ErrorMessage name="quantity" />}
                    onChange={handleQuantityChange}
                    type="number"
                    value={quantity}
                  />
                  <br />
                  </FormControl>
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row" justifyContent="flex-end" pr={2}>
              <Button type="submit" variant="contained">
                Add Items to Inventory
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

// <Field
//   as={TextField}
//   name="quantity"
//   label="Item Quantity"
//   helperText={<ErrorMessage name="quantity" />}
//   onChange={handleInputChange}
//   type="number"
//   value={quantity}
// />
// <br />
