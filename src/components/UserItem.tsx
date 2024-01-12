import { InventoryEntry } from "../types";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type UserItemProps = {
  itemEntry: InventoryEntry;
  whenEntryClicked: (id: string) => void;
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
  const { itemEntry, whenEntryClicked } = props;
  const { id, name, dateCheckedOut } = itemEntry;

  return (
    <>
      <StyledCard onClick={() => whenEntryClicked(id!)}>
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
