import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { CheckedOutBySummary } from "../types/index";

type ItemStatusTableProps = {
  summary: CheckedOutBySummary[];
};

export default function ItemStatusTable(props: ItemStatusTableProps) {
  const { summary } = props;

  console.log("ItemStatusTable, summary: ", summary);

  return (
    <Grid container pt={1}>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 15 }}>User</TableCell>
                <TableCell sx={{ fontSize: 15 }}>Quantity Checked Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.length === 0 && (
                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    (No Items
                  </TableCell>
                  <TableCell>Currently Checked Out)</TableCell>
                </TableRow>
              )}
              {summary.map((row) => (
                <TableRow key={row.checkedOutBy} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: 15 }}>
                    {row.checkedOutBy}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }}>{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
