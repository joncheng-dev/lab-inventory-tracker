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
  Tooltip,
  useTheme,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
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

// Item type list is sent here via props.
// Use item type list to populate information in input field.
// Do not save displayName to item entry in database.

const tooltipText = `Select a catalog entry to add items to inventory.`;

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
    .max(20, "Must be between 1 and 20")
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
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <Grid item>
                  <h2>Add Items to Inventory</h2>
                </Grid>
                <Grid item>
                  <Tooltip
                  title={tooltipText}
                  placement="top"
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            // offset: [0, -24],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <div>
                    <InfoOutlined />
                  </div>
                </Tooltip>
              </Grid>    
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
