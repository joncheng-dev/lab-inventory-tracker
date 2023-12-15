import InventoryReusableForm from "./InventoryReusableForm";
import { AddFormProps, InventoryEntry } from "./Types/index.tsx";

// Takes input from user to create a new Entry
function InventoryAddForm(props: AddFormProps) {
  function handleNewEntryFormSubmission(formData: InventoryEntry) {
    props.onFormSubmit(formData);
  }
  return (
    <>
      <h1>Add New Inventory Entry</h1>
      <InventoryReusableForm
        handleNewEntryFormSubmission={handleNewEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Add Entry"
      />
    </>
  );
}

export default InventoryAddForm;
