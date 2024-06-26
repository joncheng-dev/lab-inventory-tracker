import React, { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, Tooltip, useTheme, SvgIconTypeMap } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../themes";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { sharedInfo } from "../helpers/UserContext.tsx";

type ItemProps = {
  name: string;
  to: string;
  icon: React.ReactElement<SvgIconTypeMap<{}, "svg">>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

type SidebarProps = {
  onToggle: () => void;
};

function Item(props: ItemProps) {
  const { name, to, icon, selected, setSelected } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === name}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(name)}
      icon={icon}
    >
      <Typography>{name}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}

export default function Sidebar(props: SidebarProps) {
  const userProvider = sharedInfo();
  const { onToggle } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>("Dashboard");

  // useEffect(() => {
  //   onToggle();
  // }, [isCollapsed]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        // "& .pro-inner-item": {
        //   padding: "5px 35px 5px 20px !important",
        // },
        "& .pro-inner-item-hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        height: "100vh",
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            // onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
                <Typography variant="h3" color={colors.grey[100]}>
                  {userProvider?.currentUser ? userProvider.currentUser?.email : "User"}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`src/images/profile.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50px" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  User Name
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Teacher
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item title="Dashboard" to="/signin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            {/* <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography> */}
            {/* <Item title="Manage Users" to="/manageusers" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
            {userProvider?.currentUser?.isAdmin && (
              <Tooltip
                title="Catalog"
                placement="right"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -24],
                        },
                      },
                    ],
                  },
                }}
              >
                <div>
                  <Item to="/catalog" icon={<DescriptionIcon />} selected={selected} setSelected={setSelected} name="Catalog" />
                </div>
              </Tooltip>
            )}
            <Tooltip
              title="Inventory"
              placement="right"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -24],
                      },
                    },
                  ],
                },
              }}
            >
              <div>
                <Item name="Inventory" to="/inventory" icon={<InventoryIcon />} selected={selected} setSelected={setSelected} />
              </div>
            </Tooltip>
            {/* <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Pages
            </Typography>
            <Item title="Profile Form" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Charts
            </Typography>
            <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Pie Chart" to="/pie" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Line Chart" to="/line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Geography Chart" to="/geography" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}
