import React from "react";
import { InventoryReusableFormProps } from "./Types";

function InventoryReusableForm(props: InventoryReusableFormProps) {
  const subjectTagChecklist: string[] = ["Biology", "Chemistry", "Earth Science", "Physics", "General"];
  const purposeTagChecklist: string[] = ["Equipment", "Materials", "Models", "Safety"];

  function tagChecklistGenerator(wordArray: string[]) {
    return wordArray.map((word, index) => (
      <div key={index}>
        <input value={word} type="checkbox" />
        <span>{word}</span>
      </div>
    ));
  }

  return (
    <React.Fragment>
      <form onSubmit={props.onFormSubmit}>
        <input type="text" name="name" placeholder="Name of Item" />
        <br />
        <textarea name="description" placeholder="Item description" />
        <br />
        <input type="text" name="location" placeholder="Where is it normally located?" />
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

// <input type="checkbox" id="" name="" value="" />
// <label htmlFor=""></label><br/>
