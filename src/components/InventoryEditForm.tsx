import styled from "styled-components";
import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "../types";

type InventoryEditFormProps = {
  entry: InventoryEntry;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
};

const EditFormContainer = styled.div`
  text-align: left;
  margin-left: 50px;
`;

export default function InventoryEditForm(props: InventoryEditFormProps) {
  const { entry, onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  function handleEditEntryFormSubmission(formData: InventoryEntry) {
    onFormSubmit(formData);
  }
  return (
    <EditFormContainer>
      <h2>Edit Item Details</h2>
      <InventoryReusableForm
        entry={entry}
        subjectTagChecklist={subjectTagChecklist}
        purposeTagChecklist={purposeTagChecklist}
        handleEntryFormSubmission={handleEditEntryFormSubmission}
        handleClickingExit={props.onClickingExit}
        buttonText="Update"
      />
    </EditFormContainer>
  );
}
