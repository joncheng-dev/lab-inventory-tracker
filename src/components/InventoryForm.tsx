import styled from "styled-components";
import InventoryReusableForm from "./InventoryReusableForm";
import { InventoryEntry } from "../types";

type FormProps = {
  entry?: InventoryEntry;
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
};

const FormContainer = styled.div`
  text-align: left;
  margin-left: 50px;
`;

export default function InventoryForm(props: FormProps) {
  const { onFormSubmit, subjectTagChecklist, purposeTagChecklist } = props;
  function handleFormSubmission(formData: InventoryEntry) {
    if (formData.id === null) {
      const { id, ...formDataNoId } = Object.assign({}, formData);
      onFormSubmit(formDataNoId);
    } else {
      onFormSubmit(formData);
    }
  }
  return (
    <FormContainer>
      {!props.entry ? <h2>Add New Item</h2> : <h2>Edit Item Details</h2>}
      {!props.entry ? (
        <InventoryReusableForm
          entry={null}
          subjectTagChecklist={subjectTagChecklist}
          purposeTagChecklist={purposeTagChecklist}
          handleEntryFormSubmission={handleFormSubmission}
          buttonText="Add Entry"
        />
      ) : (
        <InventoryReusableForm
          entry={props.entry}
          subjectTagChecklist={subjectTagChecklist}
          purposeTagChecklist={purposeTagChecklist}
          handleEntryFormSubmission={handleFormSubmission}
          buttonText="Update"
        />
      )}
    </FormContainer>
  );
}
