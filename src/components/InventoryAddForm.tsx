import styled from "styled-components";
import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "../types";

interface AddFormProps {
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  // onClickingExit: () => void;
}

const AddFormContainer = styled.div`
  text-align: left;
  margin-left: 50px;
`;

// Takes input from user to create a new Entry
export default function InventoryAddForm(props: AddFormProps) {
  const { onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  function handleNewEntryFormSubmission(formData: InventoryEntry) {
    // take the form data, and remove the id, since I want Firestore to assign one for me.
    if (formData.id === null) {
      const { id, ...formDataNoId } = Object.assign({}, formData);
      onFormSubmit(formDataNoId);
    }
  }
  return (
    <AddFormContainer>
      <h2>Add New Item</h2>
      <InventoryReusableForm
        entry={null}
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        handleEntryFormSubmission={handleNewEntryFormSubmission}
        // handleClickingExit={props.onClickingExit}
        buttonText="Add Entry"
      />
    </AddFormContainer>
  );
}
