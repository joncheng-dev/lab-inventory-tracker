import { ReactElement } from "react";
import { Timestamp } from "firebase/firestore";

export type eTargetType = {
  email: { value: string };
  password: { value: string };
};

// Typing in common for multiple components
export interface AddItemsForm {
  itemType: string;
  quantity: number;
}

export interface Item {
  id?: string | null;
  itemType: string;
  isCheckedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: Timestamp | null;
}

export interface ItemType {
  id?: string | null;
  name: string;
  description: string;
  location: string;
  tags: string[];
}

export interface UserEntry {
  userId: string;
  userEmail: string;
}

interface CustomElements extends HTMLFormControlsCollection {
  id?: string;
  name: HTMLInputElement;
  description: HTMLInputElement;
  location: HTMLInputElement;
  checkedOut: HTMLInputElement;
  checkedOutBy: HTMLInputElement;
  dateCheckedOut: HTMLInputElement;
  tags: HTMLInputElement;
}

export interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

// Typing for Layout component
export type LayoutProps = {
  children?: ReactElement;
};
