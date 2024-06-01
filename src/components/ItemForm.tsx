import React, { useState } from "react";
import styled from "styled-components";
import { AddItemsForm, ItemType } from "../types";
import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { tokens } from "../themes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

//#region styles
const ReusableFormContainer = styled.div`
  padding-left: 30px;
  padding-top: 25px;
`;

//#endregion styles

type FormProps = {
  itemTypeList: ItemType[];
  onFormSubmit: (data: AddItemsForm) => Promise<void>;
};

const tooltipText = `Select a catalog entry to add items to inventory.`;

export default function ItemForm(props: FormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { itemTypeList, onFormSubmit } = props;

  const [formData, setFormData] = useState<AddItemsForm>({
    type: "",
    quantity: 1,
  });

  const validationSchema = yup.object().shape({
    type: yup.string().required("Required"),
    // prettier-ignore
    quantity: yup
      .number()
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
      }));
    } else if (reason === "clear") {
      setFormData((prevData) => ({
        ...prevData,
        type: "",
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
    onFormSubmit(values);
  };

  const getHeadingSize = () => {
    if (isExtraSmallScreen) {
      return "h4";
    } else if (isMediumScreen) {
      return "h3";
    } else {
      return "h2";
    }
  };

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }} mr={0.5} pr={2}>
      <ReusableFormContainer>
        <Formik
          // prettier-ignore
          initialValues={formData}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid container item xs={12} sm={12} md={12} lg={12}>
                  <Grid item component={getHeadingSize()}>
                    <Typography variant="h4">Add Items to Inventory</Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title={tooltipText} placement="top">
                      <InfoOutlined fontSize="small" />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                  <Autocomplete
                    options={itemTypeList}
                    onChange={handleAutocompleteChange}
                    getOptionLabel={(option) => option.displayName || ""}
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
                <Grid item xs={12} sm={12} md={6} lg={5}>
                  <FormControl sx={{ width: "100%" }}>
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
                  Add to Inventory
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
