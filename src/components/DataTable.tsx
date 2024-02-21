import { ItemType as IType } from "../types";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import styled from "styled-components";

type DataTableProps = {
  data: IType[];
  onEntryClick: (id: string) => void;
};

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-row:hover {
    background-color: #777777;
  }
`;

export default function DataTable(props: DataTableProps) {
  const { data, onEntryClick } = props;

  const tableColumns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2.5 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "location", headerName: "Location", flex: 1.5 },
  ];

  const tableRows = data.map((entry) => {
    return {
      id: entry.id,
      name: entry.name,
      description: entry.description,
      location: entry.location,
    };
  });

  const handleRowClick = (params: GridRowParams) => {
    const clickedRowId = params.row.id;
    onEntryClick(clickedRowId);
  };

  return (
    <StyledDataGrid
      rows={tableRows}
      columns={tableColumns}
      onRowClick={handleRowClick}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
    />
  );
}

// Type '(id: string) => void' is not assignable to type 'GridEventListener<"rowClick">'.
//   Types of parameters 'id' and 'params' are incompatible.
//     Type 'GridRowParams<any>' is not assignable to type 'string'.ts(2322)
// DataGridProps.d.ts(546, 5): The expected type comes from property 'onRowClick' which is declared here on type 'IntrinsicAttributes & Omit<Partial<DataGridPropsWithDefaultValues> & DataGridPropsWithComplexDefaultValueBeforeProcessing & DataGridPropsWithoutDefaultValue<...>, DataGridForcedPropsKey> & { ...; } & RefAttributes<...>'
// (property) onRowClick?: GridEventListener<"rowClick"> | undefined
