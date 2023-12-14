import React from "react";
import { InventoryReusableFormProps } from "./Types";

function InventoryReusableForm(props: InventoryReusableFormProps) {
  return (
    <React.Fragment>
      <form onSubmit={props.onFormSubmit}>
        <input type="text" name="name" placeholder="Name of Item" />
        <br />
        <textarea name="description" placeholder="Item description" />
        <br />
        <input type="text" name="location" placeholder="Where is it normally located?" />
        <br />
        {/* put tags -- check boxes in the form */}
        <button type="submit">{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

export default InventoryReusableForm;
