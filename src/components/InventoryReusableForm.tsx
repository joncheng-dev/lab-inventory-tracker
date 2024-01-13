import React, { useState, useEffect } from "react";
import { InventoryEntry } from "../types";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { tokens } from "../themes";

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

// Typing for Inventory Reusable Form component
interface InventoryReusableFormProps {
  entry: InventoryEntry | null;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  handleEntryFormSubmission: (data: InventoryEntry) => void;
  // handleClickingExit: () => void;
  buttonText: string;
}

export default function InventoryReusableForm(props: InventoryReusableFormProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const { entry, handleEntryFormSubmission, subjectTagChecklist, purposeTagChecklist, handleClickingExit, buttonText } = props;
  const { entry, handleEntryFormSubmission, subjectTagChecklist, purposeTagChecklist, buttonText } = props;
  const [formData, setFormData] = useState<InventoryEntry>({
    id: null,
    name: "",
    description: "",
    location: "",
    isCheckedOut: false,
    checkedOutBy: null,
    dateCheckedOut: null,
    tags: [],
  });

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        // updates tags array with all checked values
        return { ...prevData, tags: [...prevData.tags, value] };
      } else {
        // updates tags array without the unchecked values
        return { ...prevData, tags: prevData.tags.filter((element) => element !== value) };
      }
    });
  };

  const tagChecklistGenerator = (wordArray: string[]) => {
    return wordArray.map((word, index) => {
      const isChecked = formData.tags.includes(word);
      return (
        // prettier-ignore
        <div>
          <FormControlLabel
            key={index}
            value={word}
            control={<Checkbox onChange={handleCheckboxChange} checked={isChecked} />}
            label={word}
          />
          <br/>
        </div>
      );
    });
  };

  // Passes formData in to the function provided by parent component, InventoryControl
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData", formData);
    handleEntryFormSubmission(formData);
  };

  return (
    <Box sx={{ backgroundColor: colors.primary[400] }}>
      <ReusableFormContainer>
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, backgroundColor: colors.primary[400] }}>
            <Grid container spacing={2}>
              <Grid xs={7}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1.5, width: "50ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <h2>Item Form</h2>
                  <Divider />
                  <br />
                  <InputColumnContainer>
                    <TextField name="name" label="Item Name" defaultValue="Entry Name" required onChange={handleInputChange} value={formData.name} />
                    <br />
                    <TextField
                      name="description"
                      label="Item Description"
                      defaultValue="Item description"
                      required
                      onChange={handleInputChange}
                      value={formData.description}
                    />
                    <br />
                    <TextField
                      name="location"
                      label="Item Location"
                      defaultValue="Location of item"
                      required
                      onChange={handleInputChange}
                      value={formData.location}
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
                    <div>{tagChecklistGenerator(subjectTagChecklist)}</div>
                  </SubjectBoxContainer>
                  <PurposeBoxContainer>
                    <h4>
                      <strong>Purpose</strong>
                    </h4>
                    <div>{tagChecklistGenerator(purposeTagChecklist)}</div>
                  </PurposeBoxContainer>
                </div>
              </Grid>
            </Grid>
            <Stack spacing={2} direction="row">
              <Button type="submit" variant="contained">
                {buttonText}
              </Button>
              {/* <Button onClick={handleClickingExit} variant="contained">
                Exit
              </Button> */}
            </Stack>
            <br />
          </Box>
        </Box>
      </ReusableFormContainer>
    </Box>
  );
}
