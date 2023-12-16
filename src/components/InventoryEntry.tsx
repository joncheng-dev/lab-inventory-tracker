type InventoryEntryProps = {
  id?: string;
  name: string;
  description: string;
  location: string;
  isCheckedOut: boolean;
  checkedOutBy: string | null;
  dateCheckedOut: string | null;
  tags: string[];
  whenEntryClicked: (id: string) => void;
};

function InventoryEntry(props: InventoryEntryProps) {
  // prettier-ignore
  const {
    id,
    name,
    description,
    location,
    isCheckedOut,
    checkedOutBy,
    dateCheckedOut,
    tags,
    whenEntryClicked,
  } = props;

  return (
    <>
      <div onClick={() => whenEntryClicked(id!)}>
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <p>Location: {location}</p>
        <p>Is Checked Out: {isCheckedOut ? "Yes" : "No"}</p>
        <p>Checked Out By: {isCheckedOut ? checkedOutBy : null}</p>
        <p>Date Checked Out: {isCheckedOut ? dateCheckedOut : null}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default InventoryEntry;
