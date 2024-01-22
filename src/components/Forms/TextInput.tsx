import { useField, FieldInputProps } from "formik";

interface TextInputType {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const TextInput = ({ label, ...props }: TextInputType) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export default TextInput;
