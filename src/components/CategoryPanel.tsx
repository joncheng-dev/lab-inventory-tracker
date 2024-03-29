import styled from "styled-components";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import * as React from "react";

const CategoryPanelContainer = styled.div`
  text-align: left;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  &:hover {
    background-color: #777777cc;
    cursor: pointer;
  }
`;

interface CategoryPanelProps {
  tags: string[];
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onCategorySelection: (arrayOfWords: string[]) => void;
}

export default function CategoryPanel(props: CategoryPanelProps) {
  const { tags, subjectTagChecklist, purposeTagChecklist, onCategorySelection } = props;

  const handleCheckedboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedTags = [...tags];
    if (checked) {
      onCategorySelection([...updatedTags, value]);
    } else {
      onCategorySelection(updatedTags.filter((entry) => entry !== value));
    }
  };

  const tagChecklistGenerator = (wordArray: string[]) => {
    return wordArray.map((word, index) => {
      const isChecked = tags.includes(word);
      return (
        // prettier-ignore
        <StyledFormControlLabel
        key={index}
        value={word}
          control={
            <Checkbox
              // prettier-ignore
              id={`checkbox-${word}`}
              checked={isChecked}
              value={word}
              onChange={handleCheckedboxChange}
            />}
        label={word}
      />
      );
    });
  };

  return (
    <CategoryPanelContainer>
      <h2>Tags</h2>
      <Divider />
      <br />
      <form>
        <h4>
          <strong>Subjects</strong>
        </h4>
        <Divider />
        <ListContainer>{tagChecklistGenerator(subjectTagChecklist)}</ListContainer>
        <br />
        <h4>
          <strong>Purpose</strong>
        </h4>
        <Divider />
        <ListContainer>{tagChecklistGenerator(purposeTagChecklist)}</ListContainer>
      </form>
    </CategoryPanelContainer>
  );
}
