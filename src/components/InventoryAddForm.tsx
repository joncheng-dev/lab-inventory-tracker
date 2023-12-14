import React from "react";
import InventoryReusableForm from "./InventoryReusableForm";
import { AddFormProps, CustomForm } from "./Types/index.tsx";

// Takes input from user to create a new Entry
function InventoryAddForm(props: AddFormProps) {
  function handleNewEntryFormSubmission(e: React.FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;

    props.onFormSubmit({
      name: target.name.value,
      description: target.description.value,
      location: target.location.value,
      checkedOut: false,
      checkedOutBy: null,
      dateCheckedOut: null,
      tags: [],
    });
  }
  return (
    <>
      <h1>Add New Inventory Entry</h1>
      <InventoryReusableForm onFormSubmit={handleNewEntryFormSubmission} handleClickingExit={props.onClickingExit} buttonText="Add Entry" />
    </>
  );
}

export default InventoryAddForm;
