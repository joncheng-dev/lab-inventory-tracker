import { useState } from "react";
import { Button, FormControl, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

function createData(name: string, quantity: number) {
  return { name, quantity };
}

type ItemCheckOutTableProps = {
  quantAvail: number;
};

type FormInput = {
  quantity: number;
};

// !To Do:
// Form -
// Input field for user to submit a quantity (min value 1, max value quantAvail)
// Submit button - "Check Out" (conditional -- disabled if none avail)

// Functions
// Upon submit, take user's number selection, and check out those items to the user's email -- How does this work?

export default function ItemCheckOutTable(props: ItemCheckOutTableProps) {
  const { quantAvail } = props;
  console.log("ItemCheckOutTable, quantAvail: ", quantAvail);
  const rows = [createData("Available", quantAvail)];
  const [formData, setFormData] = useState<FormInput>({
    quantity: 1,
  });
  const { quantity } = formData;

  const validationSchema = yup.object().shape({
    quantity: yup
      .number()
      .integer("Must be a whole number")
      .min(1, "Must be greater than one")
      .max(quantAvail, "Must be equal to or less than quantity available")
      .required("Required"),
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.name === "quantity" ? parseInt(e.target.value, 10) || 0 : e.target.value,
    }));
  };

  const handleSubmit = (values: FormInput) => {
    console.log("ItemCheckOutTable, handleSubmit, quantityToCheckOut: ", values.quantity);
  };

  return (
    <Formik
      // prettier-ignore
      initialValues={formData}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
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
                        <Field
                          /* // prettier-ignore */
                          as={TextField}
                          name="quantity"
                          label="Item Quantity"
                          helperText={<ErrorMessage name="quantity" />}
                          onChange={handleQuantityChange}
                          type="number"
                          value={quantity}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} pt={1} sx={{ direction: "row", textAlign: "right" }}>
            <Button variant="contained" type="submit">
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
