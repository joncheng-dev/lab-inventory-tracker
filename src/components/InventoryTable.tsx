import { InventoryEntry as IEntry } from "../types";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

type InventoryTableProps = {
  data: IEntry[];
  onEntryClick: (id: string) => void;
};

export default function InventoryTable(props: InventoryTableProps) {
  const { data, onEntryClick } = props;

  const tableColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2.5 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "location", headerName: "Location", flex: 1.5 },
    { field: "isCheckedOut", headerName: "Availability", flex: 1.5 },
  ];

  const tableRows = data.map((entry) => {
    return {
      id: entry.id,
      name: entry.name,
      description: entry.description,
      location: entry.location,
      isCheckedOut: entry.isCheckedOut ? "Not Available" : "Available",
    };
  });

  const handleRowClick = (params: GridRowParams) => {
    const clickedRowId = params.row.id;
    onEntryClick(clickedRowId);
  };

  return (
    <DataGrid
      rows={tableRows}
      columns={tableColumns}
      onRowClick={handleRowClick}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[10, 20]}
    />
  );
}

// Type '(id: string) => void' is not assignable to type 'GridEventListener<"rowClick">'.
//   Types of parameters 'id' and 'params' are incompatible.
//     Type 'GridRowParams<any>' is not assignable to type 'string'.ts(2322)
// DataGridProps.d.ts(546, 5): The expected type comes from property 'onRowClick' which is declared here on type 'IntrinsicAttributes & Omit<Partial<DataGridPropsWithDefaultValues> & DataGridPropsWithComplexDefaultValueBeforeProcessing & DataGridPropsWithoutDefaultValue<...>, DataGridForcedPropsKey> & { ...; } & RefAttributes<...>'
// (property) onRowClick?: GridEventListener<"rowClick"> | undefined
