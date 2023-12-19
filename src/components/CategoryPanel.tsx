import styled from "styled-components";
import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InventoryEntry } from "./Types";

const CategoryPanelContainer = styled.div`
  text-align: left;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CategoryPanelProps {
  listOfEntries: InventoryEntry[];
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onCategorySelection: (arrayOfWords: string[]) => void;
}

function CategoryPanel(props: CategoryPanelProps) {
  const { subjectTagChecklist, purposeTagChecklist, onCategorySelection } = props;
  const [tagsToFilter, setTags] = useState<string[]>([]);

  // Next step, filter results to show to center panel
  // It will instantly filter out all the results and only show the items that have that tag.

  const handleCheckedboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTags((prevData) => {
      if (checked) {
        return [...prevData, value];
      } else {
        return prevData.filter((entry) => entry !== value);
      }
    });
  };

  const tagChecklistGenerator = (wordArray: string[]) => {
    console.log("tagChecklistGenerator", wordArray);
    return wordArray.map((word, index) => {
      const isChecked = tagsToFilter.includes(word);
      return (
        // prettier-ignore
        <FormControlLabel
        key={index}
        value={word}
          control={<Checkbox id={`checkbox-${word}`} checked={isChecked} value={word} onChange={handleCheckedboxChange}/>}
        label={word}
      />
      );
    });
  };

  useEffect(() => {
    onCategorySelection(tagsToFilter);
    console.log("useEffect tagsToFilter", tagsToFilter);
  }, [tagsToFilter]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`handleSubmit: ${tagsToFilter}`);
    onCategorySelection(tagsToFilter);
  };

  return (
    <CategoryPanelContainer>
      <h1>Category Panel</h1>
      <form onSubmit={handleSubmit}>
        <h3>
          <strong>Subjects</strong>
        </h3>
        <ListContainer>{tagChecklistGenerator(subjectTagChecklist)}</ListContainer>
        <h3>
          <strong>Purpose</strong>
        </h3>
        <ListContainer>{tagChecklistGenerator(purposeTagChecklist)}</ListContainer>
        <button type="submit">Show Matching Results</button>
      </form>
    </CategoryPanelContainer>
  );
}

export default CategoryPanel;
