import { useState } from "react";
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

function createData(name: string, quantity: number) {
  return { name, quantity };
}

// !To Do:
// Form -
// Input field for user to submit a quantity (min value 1, max value quantAvail)
// Submit button - "Check Out" (conditional -- disabled if none avail)

// Functions
// Upon submit, take user's number selection, and check out those items to the user's email -- How does this work?

export default function ItemCheckOutTable(quantAvail: number) {
  console.log("ItemCheckOutTable, quantAvail: ", quantAvail);
  const [quantityToCheckOut, setQuantityToCheckOut] = useState(1);
  const rows = [createData("Available", quantAvail)];

  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .integer("Must be a whole number")
      .min(1, "Must be greater than one")
      .max(quantAvail, "Must be equal to or less than quantity available")
      .required("Required"),
  });

  const handleSubmit = (values: { quantity: number }) => {
    console.log("ItemCheckOutTable, handleSubmit, quantityToCheckOut: ", values.quantity);
    setQuantityToCheckOut(values.quantity);
  };

  return (
    <Formik
      // prettier-ignore
      initialValues={{ quantity: quantityToCheckOut}}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
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
                      {/*prettier-ignore*/}

                      <Field
                        as={TextField}
                        name="quantity"
                        label="Item Quantity"
                        helperText={<ErrorMessage name="quantity" />}
                        type="number"
                        />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} pt={1} sx={{ direction: "row", textAlign: "right" }}>
          <Button type="submit" variant="contained">
            Check Out
          </Button>
        </Grid>
      </Grid>
    </Formik>
  );
}
