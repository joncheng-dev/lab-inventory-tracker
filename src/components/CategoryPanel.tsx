import { styled } from "@mui/material/styles";
import { tokens } from "../themes";
import { Checkbox, Divider, FormControlLabel, Typography, useTheme } from "@mui/material";

const CategoryPanelContainer = styled("div")(({ theme }) => ({
  textAlign: "left",
}));

const ListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

interface CategoryPanelProps {
  tags: string[];
  subjectTagChecklist: string[];
  purposeTagChecklist: string[];
  onCategorySelection: (arrayOfWords: string[]) => void;
}

export default function CategoryPanel(props: CategoryPanelProps) {
  const { tags, subjectTagChecklist, purposeTagChecklist, onCategorySelection } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <FormControlLabel
          key={index}
          value={word}
          control={
            <Checkbox
              // prettier-ignore
              id={`checkbox-${word}`}
              checked={isChecked}
              color="primary"
              value={word}
              onChange={handleCheckedboxChange}
            />
          }
          label={word}
        />
      );
    });
  };

  return (
    <CategoryPanelContainer>
      <Typography variant="h4">Tags</Typography>
      <Divider />
      <br />
      <form>
        <Typography variant="h6">
          <strong>Subjects</strong>
        </Typography>
        <Divider />
        <ListContainer>{tagChecklistGenerator(subjectTagChecklist)}</ListContainer>
        <br />
        <Typography variant="h6">
          <strong>Purpose</strong>
        </Typography>
        <Divider />
        <ListContainer>{tagChecklistGenerator(purposeTagChecklist)}</ListContainer>
      </form>
    </CategoryPanelContainer>
  );
}
