import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../themes";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

// Type definition for team members
type TeamMember = {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  access: "admin" | "manager" | "user";
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
  { field: "age", headerName: "Age", type: "number", align: "left" },
  { field: "phone", headerName: "Phone Number", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "access",
    headerName: "Access Level",
    flex: 1,
    renderCell: ({ row }: { row: TeamMember }) => {
      const { access } = row;
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);

      return (
        <Box
          sx={{
            width: "60%",
            m: "0 auto",
            p: "5px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: access === "admin" ? colors.greenAccent[600] : access === "manager" ? colors.greenAccent[700] : colors.greenAccent[700],
            borderRadius: "4px",
          }}
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {access}
          </Typography>
        </Box>
      );
    },
  },
];

function ManageUsers() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" width="100%">
      <h2>Manage Users</h2>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
}

export default ManageUsers;
