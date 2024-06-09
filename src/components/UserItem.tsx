import { ItemType } from "../types";
import styled from "styled-components";
import { Button, Typography } from "@mui/material/";

type UserItemProps = {
  count: number;
  entry: ItemType;
  onEntryClick: (id: string) => void;
};

const StyledButton = styled(Button)`
  && {
    display: grid;
    grid-template-areas: "displayName count";
    grid-template-columns: 60% 40%;
    width: 100%;
    text-align: left;
    outline: none;
  }
`;

const StyledTypographyName = styled(Typography)`
  display: block;
  grid-area: "displayName";
`;

const StyledTypographyCount = styled(Typography)`
  display: block;
  grid-area: "count";
  text-align: center;
`;

export default function UserItem(props: UserItemProps) {
  const { count, entry, onEntryClick } = props;
  const { id, displayName } = entry;
  return (
    <>
      <StyledButton
        variant="text"
        color="info"
        onClick={() => {
          onEntryClick(id!);
        }}
      >
        <StyledTypographyName>{displayName}</StyledTypographyName>
        <StyledTypographyCount>{count}</StyledTypographyCount>
      </StyledButton>
    </>
  );
}
