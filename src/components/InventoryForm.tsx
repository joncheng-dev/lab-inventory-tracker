import React, { useState } from "react";
import styled from "styled-components";
import { InventoryEntry } from "../types";
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
  entry?: InventoryEntry;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
};

export default function InventoryForm(props: FormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  const [formData, setFormData] = useState<InventoryEntry>(
    entry || {
      name: "",
      description: "",
      location: "",
      isCheckedOut: false,
      checkedOutBy: null,
      dateCheckedOut: null,
      tags: [],
    }
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    location: yup.string().required("Required"),
    tags: yup.array(),
  });

  console.log("InventoryForm, entry: ", entry);
  const { name, description, location, tags } = formData;
  console.log("InventoryForm, formData: ", formData);

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

  const handleSubmit = (values: InventoryEntry) => {
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
              <Grid xs={7}>
                <Box
                  component="div"
                  sx={{
                    "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                  }}
                >
                  {!entry ? <h2>Add New Item</h2> : <h2>Edit Item Details</h2>}
                  <Divider />
                  <br />
                  <InputColumnContainer>
                    {/* prettier-ignore */}
                    <Field 
                      as={TextField}
                      name="name"
                      label="Item Name"
                      helperText={<ErrorMessage name="name" />}
                      onChange={handleInputChange}
                      value={name}
                    />
                    <br />
                    {/* prettier-ignore */}
                    <Field
                      as={TextField}
                      name="description"
                      label="Item Description"
                      helperText={<ErrorMessage name="description" />}
                      onChange={handleInputChange}
                      value={description}
                    />
                    <br />
                    {/* prettier-ignore */}
                    <Field
                      as={TextField}
                      name="location"
                      label="Item Location"
                      helperText={<ErrorMessage name="location" />}
                      onChange={handleInputChange}
                      value={location}
                    />                    
                    <br />
                  </InputColumnContainer>
                </Box>
              </Grid>
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
            </Grid>
            <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained">
              {!entry ? "Add Entry" : "Update"}
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

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { InventoryEntry } from "../types";
// import { Checkbox } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { Box, useTheme } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import Divider from "@mui/material/Divider";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import { tokens } from "../themes";

// //#region styles
// const ReusableFormContainer = styled.div`
//   padding-left: 50px;
//   padding-top: 25px;
// `;

// const InputColumnContainer = styled.div`
//   float: left;
//   width: 100%;
// `;

// const SubjectBoxContainer = styled.div`
//   float: left;
//   width: 50%;
//   text-align: left;
// `;

// const PurposeBoxContainer = styled.div`
//   float: right;
//   width: 50%;
//   text-align: left;
// `;
// //#endregion styles

// type FormProps = {
//   entry?: InventoryEntry;
//   subjectTagChecklist: string[];
//   purposeTagChecklist: string[];
//   onFormSubmit: (data: InventoryEntry) => Promise<void>;
// };

// export default function InventoryReusableForm(props: FormProps) {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;

//   const [formData, setFormData] = useState<InventoryEntry>({
//     id: null,
//     name: "",
//     description: "",
//     location: "",
//     isCheckedOut: false,
//     checkedOutBy: null,
//     dateCheckedOut: null,
//     tags: [],
//   });

//   useEffect(() => {
//     if (entry) {
//       setFormData(entry);
//     }
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;
//     setFormData((prevData) => {
//       if (checked) {
//         // updates tags array with all checked values
//         return { ...prevData, tags: [...prevData.tags, value] };
//       } else {
//         // updates tags array without the unchecked values
//         return { ...prevData, tags: prevData.tags.filter((element) => element !== value) };
//       }
//     });
//   };

//   const tagChecklistGenerator = (wordArray: string[]) => {
//     return wordArray.map((word, index) => {
//       const isChecked = formData.tags.includes(word);
//       return (
//         // prettier-ignore
//         <div>
//           <FormControlLabel
//             key={index}
//             value={word}
//             control={<Checkbox onChange={handleCheckboxChange} checked={isChecked} />}
//             label={word}
//           />
//           <br/>
//         </div>
//       );
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("formData", formData);
//     if (formData.id === null) {
//       const { id, ...formDataNoId } = Object.assign({}, formData);
//       onFormSubmit(formDataNoId);
//     } else {
//       onFormSubmit(formData);
//     }
//   };

//   return (
//     <Box sx={{ backgroundColor: colors.primary[400] }}>
//       <ReusableFormContainer>
//         <Box component="form" onSubmit={handleSubmit}>
//           <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
//             <Grid container spacing={2}>
//               <Grid xs={7}>
//                 <Box
//                   component="form"
//                   sx={{
//                     "& .MuiTextField-root": { m: 1.5, width: "50ch" },
//                   }}
//                   noValidate
//                   autoComplete="off"
//                 >
//                   {!entry ? <h2>Add New Item</h2> : <h2>Edit Item Details</h2>}
//                   <Divider />
//                   <br />
//                   <InputColumnContainer>
//                     <TextField name="name" label="Item Name" defaultValue="Entry Name" required onChange={handleInputChange} value={formData.name} />
//                     <br />
//                     <TextField
//                       name="description"
//                       label="Item Description"
//                       defaultValue="Item description"
//                       required
//                       onChange={handleInputChange}
//                       value={formData.description}
//                     />
//                     <br />
//                     <TextField
//                       name="location"
//                       label="Item Location"
//                       defaultValue="Location of item"
//                       required
//                       onChange={handleInputChange}
//                       value={formData.location}
//                     />
//                     <br />
//                   </InputColumnContainer>
//                 </Box>
//               </Grid>
//               <Grid xs={5} pt={1}>
//                 <h2>Tags</h2>
//                 <Divider />
//                 <br />
//                 <div className="row">
//                   <SubjectBoxContainer>
//                     <h4>
//                       <strong>Subjects</strong>
//                     </h4>
//                     <div>{tagChecklistGenerator(subjectTagChecklist)}</div>
//                   </SubjectBoxContainer>
//                   <PurposeBoxContainer>
//                     <h4>
//                       <strong>Purpose</strong>
//                     </h4>
//                     <div>{tagChecklistGenerator(purposeTagChecklist)}</div>
//                   </PurposeBoxContainer>
//                 </div>
//               </Grid>
//             </Grid>
//             <Stack spacing={2} direction="row">
//               <Button type="submit" variant="contained">
//                 {!entry ? "Add Entry" : "Update"}
//               </Button>
//             </Stack>
//             <br />
//           </Box>
//         </Box>
//       </ReusableFormContainer>
//     </Box>
//   );
// }
