import { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Tooltip } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { InfoOutlined } from "@mui/icons-material";
import { EditQuantityForm } from "../types";
import * as yup from "yup";

const ChildModalStyle = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type ChildModalEditQuantProps = {
  quantTotal: number;
  onFormSubmit: (data: EditQuantityForm) => void;
};

const validationSchema = yup.object().shape({
  quantity: yup
    .number()
    .integer("Must be a whole number")
    .min(1, "Must be greater than one")
    .max(20, "Must be between 1 and 20")
    .required("Required"),
});

const tooltipText = `Total number or units of this item type in the laboratory.`;

export default function ChildModalEditQuant(props: ChildModalEditQuantProps) {
  const { quantTotal, onFormSubmit } = props;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    quantity: quantTotal,
  });
  const { quantity } = formData;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: quantTotal,
    }));
  }, [quantTotal]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.name === "quantity" ? parseInt(e.target.value, 10) || 0 : e.target.value,
    }));
  };

  const handleSubmit = (values: EditQuantityForm) => {
    onFormSubmit(values);
    setFormData({ quantity: quantTotal });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Modify Total Quantity
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...ChildModalStyle, width: 400 }}>
          <Formik
            // prettier-ignore
            initialValues={formData}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container item xs={10.5} borderRadius="3px" justifyContent="flex-start">
                <Grid item>
                  <h4>Update Total Quantity</h4>
                </Grid>
                <Grid item>
                  <Tooltip
                    title={tooltipText}
                    placement="top"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              // offset: [0, -24],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div>
                      <InfoOutlined />
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Field
                    /* // prettier-ignore */
                    as={TextField}
                    name="quantity"
                    label="Total Quantity"
                    helperText={<ErrorMessage name="quantity" />}
                    inputProps={{ min: "0" }}
                    onChange={handleQuantityChange}
                    type="number"
                    value={quantity}
                    sx={{ fontSize: 15 }}
                  />
                </Grid>
                <Grid item xs={12} pt={1} display="flex" justifyContent="space-around">
                  <Button onClick={handleClose} variant="contained">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
