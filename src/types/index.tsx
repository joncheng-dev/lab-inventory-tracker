import { ReactElement } from "react";
import { Timestamp } from "firebase/firestore";

export type eTargetType = {
  email: { value: string };
  password: { value: string };
};

// Typing in common for multiple components
export interface AddItemsForm {
  type: string;
  // displayName: string;
  quantity: number;
}

export interface Item {
  id?: string | null;
  type: string;
  // displayName: string;
  isCheckedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: Timestamp | null;
}

export interface ItemType {
  count?: number;
  id?: string | null;
  description: string;
  displayName: string;
  location: string;
  tags: string[];
  type: string;
  image: string;
}

export type CheckOutFormInput = {
  quantity: number;
};

export type EditQuantityForm = {
  quantity: number;
};

export interface UserEntry {
  userId: string;
  userEmail: string;
}

export type CheckedOutBySummary = {
  checkedOutBy: string;
  quantity: number;
};

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
