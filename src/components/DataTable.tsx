import { ItemType } from "../types";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

type DataTableProps = {
  data: ItemType[];
  onEntryClick: (id: string) => void;
};

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-columnHeaderTitleContainer {
    font-size: 1.5em;
  }
  .MuiDataGrid-row:hover {
    /* &:hover { */
    background-color: #777777cc;
    cursor: pointer;
  }
`;

export default function DataTable(props: DataTableProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { data, onEntryClick } = props;

  const tableColumns = [
    { field: "displayName", headerName: "Display Name", flex: 2 },
    { field: "type", headerName: "Type", flex: 2 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "location", headerName: "Location", flex: 1.5 },
  ];

  if (currentPath === "/inventory") {
    tableColumns.push({ field: "count", headerName: "Qty on Hand", flex: 1 });
  }

  const tableRows = data.map((entry) => {
    return {
      id: entry.id,
      displayName: entry.displayName,
      description: entry.description,
      location: entry.location,
      type: entry.type,
      count: entry.count,
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
