import React from "react";
import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEditFormProps, CustomForm } from "./Types";

function InventoryEditForm(props: InventoryEditFormProps) {
  const { entry } = props;

  function handleEditEntryFormSubmission(e: React.FormEvent<CustomForm>) {
    e.preventDefault();
    const target = e.currentTarget.elements;

    props.onFormSubmit({
      id: entry.id,
      name: target.name.value,
      description: target.description.value,
      location: target.location.value,
      checkedOut: entry.checkedOut,
      checkedOutBy: entry.checkedOutBy,
      dateCheckedOut: entry.dateCheckedOut,
      tags: [],
    });
  }
  return (
    <>
      <InventoryReusableForm onFormSubmit={handleEditEntryFormSubmission} handleClickingExit={props.onClickingExit} buttonText="Update" />
    </>
  );
}

export default InventoryEditForm;
