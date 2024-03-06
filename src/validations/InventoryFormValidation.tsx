import React from "react";
import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  location: yup.string().required(),
});

// comment
