import React, { useState } from "react";
import { InventoryReusableFormProps } from "./Types";

function InventoryReusableForm(props: InventoryReusableFormProps) {
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Materials", "Models", "Safety"];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: [] as string[],
  });

  // Handles form changes
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

  // function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
  //   setCheckedBoxes((prevCheckedBoxes) => {
  //     if (event.target.checked) {
  //       return [...prevCheckedBoxes, event.target.value];
  //     } else {
  //       return prevCheckedBoxes.filter((value) => value !== event.target.value);
  //     }
  //   });
  // }

  function tagChecklistGenerator(wordArray: string[]) {
    return wordArray.map((word, index) => (
      <div key={index}>
        <input value={word} type="checkbox" onChange={handleCheckboxChange} />
        <label htmlFor={word}>{word}</label>
      </div>
    ));
  }

  return (
    <React.Fragment>
      <form onSubmit={props.onFormSubmit}>
        <input type="text" name="name" placeholder="Name of Item" onChange={handleInputChange} />
        <br />
        <textarea name="description" placeholder="Item description" onChange={handleInputChange} />
        <br />
        <input type="text" name="location" placeholder="Where is it normally located?" onChange={handleInputChange} />
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
      </form>
    </React.Fragment>
  );
}

export default InventoryReusableForm;
