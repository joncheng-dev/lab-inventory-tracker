import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";

function createData(name: string, quantity: number) {
  return { name, quantity };
}

type ItemCheckOutTableProps = {
  quantAvail: number;
};

// !To Do:
// Form -
// Input field for user to submit a quantity (min value 1, max value quantAvail)
// Submit button - "Check Out" (conditional -- disabled if none avail)

// Functions
// Upon submit, take user's number selection, and check out those items to the user's email -- How does this work?

export default function ItemCheckOutTable(props: ItemCheckOutTableProps) {
  const { quantAvail } = props;
  const rows = [createData("Available", quantAvail)];
  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>To Check Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      // as={TextField}
                      name="quantity"
                      label="Item Quantity"
                      // helperText={<ErrorMessage name="quantity" />}
                      // onChange={handleQuantityChange}
                      type="number"
                      // value={quantity}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} pt={1} sx={{ direction: "row", textAlign: "right" }}>
        <Button variant="contained">Check Out</Button>
      </Grid>
    </Grid>
  );
}
