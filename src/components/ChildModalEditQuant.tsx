import { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, TextField, Tooltip, Typography, useTheme } from "@mui/material";
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
  // border: "2px solid #000",
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
  //prettier-ignore
  quantity: yup.number()
    .integer("Must be a whole number")
    .min(1, "Must be 1 or greater.")
    .max(20, "Must be between 1 and 20.")
    .required("Required"),
});

const tooltipText = `Total number or units of this item type in the laboratory.`;

export default function ChildModalEditQuant(props: ChildModalEditQuantProps) {
  const { quantTotal, onFormSubmit } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [formData, setFormData] = useState({
    quantity: quantTotal,
  });
  const { quantity } = formData;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({
      quantity: quantTotal,
    });
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
    if (quantTotal < quantity) {
      handleClose();
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ marginTop: "20px", marginRight: "15px", marginBottom: "15px" }}>
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
              <div style={{ display: "flex" }}>
                <Typography variant="h5">Update Total Quantity</Typography>
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
                  <InfoOutlined fontSize="small" />
                </Tooltip>
              </div>

              <Field
                /* // prettier-ignore */
                as={TextField}
                name="quantity"
                label="Total Quantity"
                fullWidth
                helperText={<ErrorMessage name="quantity" />}
                inputProps={{ min: "0" }}
                onChange={handleQuantityChange}
                type="number"
                value={quantity}
                sx={{ fontSize: 15, marginTop: "15px" }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
                <Button onClick={handleClose} variant="contained" color="secondary" sx={{ marginRight: "15px" }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </div>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
