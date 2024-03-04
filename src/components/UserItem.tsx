import { Item, ItemType } from "../types";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type UserItemProps = {
  count: number;
  entry: ItemType;
  onEntryClick: (id: string) => void;
};

const StyledCard = styled(Card)`
  flex: 0 1 auto;
  max-width: 100%;
  border: 1px rgba(232, 230, 227, 0.87);
  /* background: #369; */
  position: relative;
  text-align: left;

  .css-46bh2p-MuiCardContent-root:hover {
    background-color: #777777;
  }
`;

export default function UserItem(props: UserItemProps) {
  const { count, entry, onEntryClick } = props;
  const { id, displayName } = entry;
  return (
    <>
      <StyledCard
        onClick={() => {
          onEntryClick(id!);
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {displayName}
          </Typography>
          <Typography variant="body2">{count}</Typography>
        </CardContent>
      </StyledCard>
    </>
  );
}
