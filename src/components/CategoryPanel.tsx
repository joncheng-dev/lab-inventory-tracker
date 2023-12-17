import { useState, useEffect } from "react";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CategoryPanelProps {
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
}

function CategoryPanel(props: CategoryPanelProps) {
  const { subjectTagChecklist, purposeTagChecklist } = props;
  const [tagsToFilter, setTags] = useState<string[]>([]);

  useEffect(() => {
    console.log(tagsToFilter);
  }, [tagsToFilter]);

  const tagChecklistGenerator = (wordArray: string[]) => {
    return wordArray.map((word, index) => {
      return (
        // prettier-ignore
        <FormControlLabel
        key={index}
        value={word}
        control={<Checkbox onChange={handleCheckedboxChange}/>}
        label={word}
      />
      );
    });
  };

  // There should be a use effect hook.
  // This listens to any changes to the array of tag checklist values.
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

  return (
    <>
      <h1>Category Panel</h1>
      <form>
        <h4>
          <strong>Subjects</strong>
        </h4>
        <div>{tagChecklistGenerator(subjectTagChecklist)}</div>
        <h4>
          <strong>Purpose</strong>
        </h4>
        <div>{tagChecklistGenerator(purposeTagChecklist)}</div>
      </form>
    </>
  );
}

export default CategoryPanel;
