import { InventoryEntry } from "../types";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type UserItemProps = {
  entry: InventoryEntry;
  onEntryClick: (id: string) => void;
};

const StyledCard = styled(Card)`
  flex: 0 1 auto;
  max-width: 100%;
  border: 1px rgba(232, 230, 227, 0.87);
  background: #369;
  position: relative;
  text-align: left;
`;

export default function UserItem(props: UserItemProps) {
  const { entry, onEntryClick } = props;
  const { id, name, dateCheckedOut } = entry;

  return (
    <>
      <StyledCard
        onClick={() => {
          console.log("UserItem, Div clicked, id is: ", id);
          onEntryClick(id!);
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">Checkout Date: {dateCheckedOut}</Typography>
        </CardContent>
      </StyledCard>
    </>
  );
}
