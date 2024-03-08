import { ItemType } from "../types";
import styled from "styled-components";
import { Card, CardContent, Grid, Typography } from "@mui/material/";

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

  /* .css-46bh2p-MuiCardContent-root:hover { */
  &:hover {
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
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h5" component="div">
                {displayName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" textAlign="center">
                {count}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>
    </>
  );
}
