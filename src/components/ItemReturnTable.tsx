import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Item } from "../types/index.js";

function createData(checkedOutBy: string, quantity: number) {
  return { checkedOutBy, quantity };
}

type ItemReturnTableProps = {
  itemList: Item[];
};

// !To Do:
// Table showing who checked out what
// Checked Out By  |   Date    |   Quantity
// Dale              2/28/2024         5
// Mike              1/20/2024         3

// In InventoryEntryDetail, each item has a list of items of the same itemType.
// For each unique 'checkedOutBy', tally up a 'quantity'
// Send in to ItemReturnTable
// (later, we can add details, which upon expanding table, can see what id each person has. Date checked out also)

// Return button (conditional -- enabled if any of items have 'checkedOutBy' field that is user's email)

export default function ItemReturnTable(props: ItemReturnTableProps) {
  const { itemList } = props;
  
  const borrowersList = () => {
    const log = itemList.
  };
  
  const rows = [createData("Available", quantAvail)];
  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Checked Out By</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} pt={1} sx={{ direction: "row", textAlign: "right" }}>
        <Button variant="contained">Return</Button>
      </Grid>
    </Grid>
  );
}
