import React, { useState } from "react";
import styled from "styled-components";
import { ItemType } from "../types";
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Stack, TextField, useTheme } from "@mui/material";
import { tokens } from "../themes";
import { v4 as uuidv4 } from "uuid";
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

const SubjectBoxContainer = styled.div`
  float: left;
  width: 50%;
  text-align: left;
`;

const PurposeBoxContainer = styled.div`
  float: right;
  width: 50%;
  text-align: left;
`;
//#endregion styles

type FormProps = {
  entry?: ItemType;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: ItemType) => Promise<void>;
};

export default function ItemTypeForm(props: FormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  const [formData, setFormData] = useState<ItemType>(
    entry || {
      displayName: "",
      description: "",
      location: "",
      tags: [],
      type: "",
    }
  );

  const validationSchema = yup.object().shape({
    displayName: yup.string().required("Required"),
    description: yup.string().required("Required"),
    location: yup.string().required("Required"),
    tags: yup.array(),
    type: yup.string().required("Required"),
  });

  console.log("ItemTypeForm, entry: ", entry);
  const { displayName, description, location, tags, type } = formData;
  console.log("ItemTypeForm, formData: ", formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => {
      if (e.target.checked) {
        // updates tags array with all checked values
        return { ...prevData, tags: [...prevData.tags, e.target.value] };
      } else {
        // updates tags array without the unchecked values
        return { ...prevData, tags: prevData.tags.filter((element) => element !== e.target.value) };
      }
    });
  };

  const tagChecklistGenerator = (wordArray: string[]) => {
    return wordArray.map((word) => {
      const isChecked = tags.includes(word);
      const key = uuidv4();
      return (
        // prettier-ignore
        <div key={key}>
          <FormControlLabel
            value={word}
            control={<Checkbox onChange={handleCheckboxChange} checked={isChecked} id={key} />}
            label={word}
          />
          <br/>
        </div>
      );
    });
  };

  const handleSubmit = (values: ItemType) => {
    console.log("handleSubmit, values: ", values);
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
              <Grid xs={5} pt={1}>
                <h2>Tags</h2>
                <Divider />
                <br />
                <div className="row">
                  <SubjectBoxContainer>
                    <h4>
                      <strong>Subjects</strong>
                    </h4>
                    {tagChecklistGenerator(subjectTagChecklist)}
                  </SubjectBoxContainer>
                  <PurposeBoxContainer>
                    <h4>
                      <strong>Purpose</strong>
                    </h4>
                    {tagChecklistGenerator(purposeTagChecklist)}
                  </PurposeBoxContainer>
                </div>
              </Grid>
              <Grid xs={7}>
                <Box
                  component="div"
                  sx={{
                    "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                  }}
                >
                  {!entry ? <h2>Add New Item Type</h2> : <h2>Edit Item Type Details</h2>}
                  <Divider />
                  <br />
                  <InputColumnContainer>
                    {/* prettier-ignore */}
                    <Field 
                      as={TextField}
                      name="displayName"
                      label="Item Type Display Name"
                      helperText={<ErrorMessage name="displayName" />}
                      onChange={handleInputChange}
                      value={displayName}
                    />
                    <br />
                    {/* prettier-ignore */}
                    <Field 
                      as={TextField}
                      name="type"
                      label="Item Type"
                      helperText={<ErrorMessage name="type" />}
                      onChange={handleInputChange}
                      value={type}
                    />
                    <br />
                    {/* prettier-ignore */}
                    <Field
                      as={TextField}
                      name="description"
                      label="Item Type Description"
                      helperText={<ErrorMessage name="description" />}
                      onChange={handleInputChange}
                      value={description}
                    />
                    <br />
                    {/* prettier-ignore */}
                    <Field
                      as={TextField}
                      name="location"
                      label="Item Type Location"
                      helperText={<ErrorMessage name="location" />}
                      onChange={handleInputChange}
                      value={location}
                    />                    
                    <br />
                  </InputColumnContainer>
                </Box>
              </Grid>
            </Grid>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                {!entry ? "Add Item Type" : "Update Item Type"}
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
