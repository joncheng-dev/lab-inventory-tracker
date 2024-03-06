import React, { useEffect, useState } from "react";
import { Button, FormControl, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { CheckOutFormInput } from "../types";
import * as yup from "yup";

function createData(name: string, quantity: number) {
  return { name, quantity };
}

type ItemCheckOutTableProps = {
  quantAvail: number;
  // onFormSubmit: (data: CheckOutFormInput) => Promise<void>;
  onFormSubmit: (data: CheckOutFormInput) => void;
};

export default function ItemCheckOutTable(props: ItemCheckOutTableProps) {
  const { quantAvail, onFormSubmit } = props;
  console.log("ItemCheckOutTable, quantAvail: ", quantAvail);
  const rows = [createData("Available", quantAvail)];
  const [formData, setFormData] = useState<CheckOutFormInput>({
    quantity: quantAvail > 0 ? 1 : 0,
  });
  const { quantity } = formData;

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: quantAvail > 0 ? 1 : 0,
    }));
  }, [quantAvail]);

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

  const handleSubmit = (values: CheckOutFormInput) => {
    console.log("ItemCheckOutTable, handleSubmit, quantityToCheckOut: ", values.quantity);
    onFormSubmit(values);

    setFormData({ quantity: quantAvail > 0 ? 1 : 0 });
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
                    <TableCell sx={{ fontSize: 15 }}>Quantity Available</TableCell>
                    <TableCell sx={{ fontSize: 15 }}>To Check Out</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ fontSize: 12 }}>
                        {quantAvail}
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
                          sx={{ fontSize: 15 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} pt={1} sx={{ direction: "row", textAlign: "right" }}>
            {quantAvail >= 1 ? (
              <Button variant="contained" type="submit" sx={{ fontSize: 12 }}>
                Check Out
              </Button>
            ) : (
              <Button variant="contained" type="submit" disabled sx={{ fontSize: 12 }}>
                Check Out
              </Button>
            )}
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
