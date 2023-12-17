import React, { useState, useEffect } from "react";
import { InventoryEntry } from "./Types";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

// Typing for Inventory Reusable Form component
interface InventoryReusableFormProps {
  entry: InventoryEntry | null;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  handleEntryFormSubmission: (data: InventoryEntry) => void;
  handleClickingExit: () => void;
  buttonText: string;
}

function InventoryReusableForm(props: InventoryReusableFormProps) {
  const { entry, handleEntryFormSubmission, subjectTagChecklist, purposeTagChecklist, handleClickingExit } = props;
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
        <FormControlLabel
          key={index}
          value={word}
          control={<Checkbox onChange={handleCheckboxChange} checked={isChecked} />}
          label={word}
        />
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
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name of Item" onChange={handleInputChange} value={formData.name} />
        <br />
        <textarea name="description" placeholder="Item description" onChange={handleInputChange} value={formData.description} />
        <br />
        <input type="text" name="location" placeholder="Where is it normally located?" onChange={handleInputChange} value={formData.location} />
        <br />
        <h2>Categories</h2>
        <h4>
          <strong>Subjects</strong>
        </h4>
        <div>{tagChecklistGenerator(subjectTagChecklist)}</div>
        <h4>
          <strong>Purpose</strong>
        </h4>
        <div>{tagChecklistGenerator(purposeTagChecklist)}</div>
        <button type="submit">{props.buttonText}</button>
        <button onClick={handleClickingExit}>Exit</button>
      </form>
    </React.Fragment>
  );
}

export default InventoryReusableForm;
