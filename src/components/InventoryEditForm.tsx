import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "./Types";

type InventoryEditFormProps = {
  entry: InventoryEntry;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
};

function InventoryEditForm(props: InventoryEditFormProps) {
  const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  function handleEditEntryFormSubmission(formData: InventoryEntry) {
    onFormSubmit(formData);
  }
  return (
    <>
      <InventoryReusableForm
        entry={entry}
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        handleEntryFormSubmission={handleEditEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Update"
      />
    </>
  );
}

export default InventoryEditForm;
