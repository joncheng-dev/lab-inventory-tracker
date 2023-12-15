import { ReactElement } from "react";

export type eTargetType = {
  email: { value: string };
  password: { value: string };
};

// Typing For Inventory Add Form component
export interface AddFormProps {
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
}

// Typing for Inventory Edit Form component
export interface InventoryEditFormProps {
  entry: InventoryEntry;
  onFormSubmit: (data: InventoryEntry) => Promise<void>;
  onClickingExit: () => void;
}

// Typing for Inventory Reusable Form component
export interface InventoryReusableFormProps {
  handleNewEntryFormSubmission: (data: InventoryEntry) => void;
  handleClickingExit: () => void;
  buttonText: string;
}

// Typing in common for multiple components
export interface InventoryEntry {
  id?: string;
  name: string;
  description: string;
  location: string;
  checkedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: string | null;
  tags?: string[] | null;
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

// Typing for Inventory List component
export type InventoryListProps = {
  listOfEntries: InventoryEntry[];
  onEntrySelection: (id: string) => void;
  onClickingAddEntry: () => void;
};

// Typing for Inventory Entry component
export type InventoryEntryProps = {
  id?: string;
  name: string;
  description: string;
  location: string;
  checkedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: string | null;
  tags: string[] | null;
  whenEntryClicked: (id: string) => void;
};

// Typing for Inventory Entry Details component
export type InventoryEntryDetailProps = {
  entry: InventoryEntry;
  onClickingCheckoutOrReturn: (id: string, task: string) => void;
  onClickingEdit: () => void;
  onClickingDelete: (id: string) => void;
};

// Typing for Layout component
export type LayoutProps = {
  children?: ReactElement;
};
