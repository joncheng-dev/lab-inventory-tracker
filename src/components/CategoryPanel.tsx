import styled from "styled-components";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const CategoryPanelContainer = styled.div`
  text-align: left;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface CategoryPanelProps {
  tags: string[];
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onCategorySelection: (arrayOfWords: string[]) => void;
}

function CategoryPanel(props: CategoryPanelProps) {
  console.log("CategoryPanel: rendered");
  const { tags, subjectTagChecklist, purposeTagChecklist, onCategorySelection } = props;

  // Next step, filter results to show to center panel
  // It will instantly filter out all the results and only show the items that have that tag.

  const handleCheckedboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log("a box was changed:", value);
    console.log("Checkbox changed:", value, checked);
    const updatedTags = [...tags];
    if (checked) {
      onCategorySelection([...updatedTags, value]);
    } else {
      onCategorySelection(updatedTags.filter((entry) => entry !== value));
    }
  };

  const tagChecklistGenerator = (wordArray: string[]) => {
    console.log("CategoryPanel: tagChecklistGenerator", wordArray);
    return wordArray.map((word, index) => {
      const isChecked = tags.includes(word);
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

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("handleSubmit:", tagsToFilter);
  //   onCategorySelection(tagsToFilter);
  // };

  return (
    <CategoryPanelContainer>
      <h1>Category Panel</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <h3>
          <strong>Subjects</strong>
        </h3>
        <ListContainer>{tagChecklistGenerator(subjectTagChecklist)}</ListContainer>
        <h3>
          <strong>Purpose</strong>
        </h3>
        <ListContainer>{tagChecklistGenerator(purposeTagChecklist)}</ListContainer>
        {/* <button type="submit">Show Matching Results</button> */}
      </form>
    </CategoryPanelContainer>
  );
}

export default CategoryPanel;
