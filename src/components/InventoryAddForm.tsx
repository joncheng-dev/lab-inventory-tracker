import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "./Types";

interface AddFormProps {
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
}

// Takes input from user to create a new Entry
function InventoryAddForm(props: AddFormProps) {
  function handleNewEntryFormSubmission(formData: InventoryEntry) {
    props.onFormSubmit(formData);
  }
  return (
    <>
      <h1>Add New Inventory Entry</h1>
      <InventoryReusableForm
        entry={null}
        handleEntryFormSubmission={handleNewEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Add Entry"
      />
    </>
  );
}

export default InventoryAddForm;
