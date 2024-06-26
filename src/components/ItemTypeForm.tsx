import React, { useState } from "react";
import styled from "styled-components";
import ImageSelector from "../components/ImageSelector";
import { ItemType } from "../types";
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { tokens } from "../themes";
import { v4 as uuidv4 } from "uuid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

//#region styles
const ReusableFormContainer = styled.div`
  padding-left: 20px;
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
  padding-left: 15px;
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

const imageTooltipText = `Select an image to represent this item type.`;

export default function ItemTypeForm(props: FormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  const [selectedImage, setSelectedImage] = useState<string>(entry?.image || "equipment1");
  const [formData, setFormData] = useState<ItemType>(
    entry || {
      displayName: "",
      description: "",
      location: "",
      tags: [],
      type: "",
      image: "",
    }
  );

  const validationSchema = yup.object().shape({
    displayName: yup.string().required("Required"),
    description: yup.string().max(600, "Must be less than 600 characters.").required("Required"),
    location: yup.string().max(100, "Must be less than 100 characters").required("Required"),
    tags: yup.array(),
    type: yup.string().max(100, "Must be less than 100 characters").required("Required"),
  });

  const { displayName, description, location, tags, type } = formData;

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
    values.image = selectedImage || "";
    onFormSubmit(values);
  };

  return (
    <Box sx={{ backgroundColor: colors.primary[400], maxHeight: "80vh", overflowY: "auto" }}>
      <ReusableFormContainer>
        <Formik
          // prettier-ignore
          initialValues={formData}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
                  <Box
                    component="div"
                    sx={{
                      "& .MuiTextField-root": { m: 1, ml: 0.5, width: "100%" },
                      width: "calc(100% - 24px)",
                    }}
                  >
                    {!entry ? <Typography variant="h5">Add New Item Type</Typography> : <Typography variant="h5">Edit Item Type Details</Typography>}
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
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5} pt={1}>
                  <Typography variant="h5">Tags</Typography>
                  <Divider />
                  <br />
                  <div className="row">
                    <SubjectBoxContainer>
                      <Typography variant="h6">
                        <u>Subjects</u>
                      </Typography>
                      {tagChecklistGenerator(subjectTagChecklist)}
                    </SubjectBoxContainer>
                    <PurposeBoxContainer>
                      <Typography variant="h6">
                        <u>Purpose</u>
                      </Typography>
                      {tagChecklistGenerator(purposeTagChecklist)}
                    </PurposeBoxContainer>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={12}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="h5">Image</Typography>
                    <Tooltip
                      title={imageTooltipText}
                      placement="top"
                      sx={{ marginRight: 1 }}
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                // offset: [0, -25],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <InfoOutlined fontSize="small" />
                    </Tooltip>
                  </div>
                  <ImageSelector onSelect={setSelectedImage} initialSelectedImage={selectedImage} />
                </Grid>
              </Grid>
              <Stack spacing={2} direction="row" justifyContent="flex-end" pr={2}>
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
