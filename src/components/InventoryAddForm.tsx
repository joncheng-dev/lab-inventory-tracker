import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "../types";

interface AddFormProps {
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
}

// Takes input from user to create a new Entry
function InventoryAddForm(props: AddFormProps) {
  const { onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  function handleNewEntryFormSubmission(formData: InventoryEntry) {
    // take the form data, and remove the id, since I want Firestore to assign one for me.
    if (formData.id === null) {
      const { id, ...formDataNoId } = Object.assign({}, formData);
      onFormSubmit(formDataNoId);
    }
  }
  return (
    <>
      <h1>Add New Inventory Entry</h1>
      <InventoryReusableForm
        entry={null}
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        handleEntryFormSubmission={handleNewEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Add Entry"
      />
    </>
  );
}

export default InventoryAddForm;
