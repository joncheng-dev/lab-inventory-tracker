import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "./Types";

interface InventoryEditFormProps {
  entry: InventoryEntry;
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
}

function InventoryEditForm(props: InventoryEditFormProps) {
  const { entry } = props;

  function handleEditEntryFormSubmission(formData: InventoryEntry) {
    props.onFormSubmit(formData);
  }
  return (
    <>
      <InventoryReusableForm
        entry={entry}
        handleEntryFormSubmission={handleEditEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Update"
      />
    </>
  );
}

export default InventoryEditForm;
