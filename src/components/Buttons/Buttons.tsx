import { Box, Button, Grid, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { StyledIconButton } from "../../style/styles";
import { Apps, ViewHeadline } from "@mui/icons-material";

type IconButtonWithTooltipProps = {
  tooltip: string;
  onClick: () => void;
  icon: JSX.Element;
};

type ViewSelectorButtonsProps = {
  onCardViewClick: () => void;
  onTableViewClick: () => void;
};

export const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({ tooltip, onClick, icon }) => (
  <Tooltip title={tooltip}>
    <StyledIconButton onClick={onClick} disableRipple>
      {icon}
    </StyledIconButton>
  </Tooltip>
);

export const ViewSelectorButtons: React.FC<ViewSelectorButtonsProps> = ({ onCardViewClick, onTableViewClick }) => (
  <Stack direction="row">
    {/* prettier-ignore */}
    <IconButtonWithTooltip
      tooltip="Card View"
      onClick={onCardViewClick}
      icon={<Apps sx={{ fontSize: 25, ml: 1, mb: 1 }} />}
      />
    {/* prettier-ignore */}
    <IconButtonWithTooltip
      tooltip="Table View"
      onClick={onTableViewClick}
      icon={<ViewHeadline sx={{ fontSize: 25, mr: 1, mb: 1 }} />}
    />
  </Stack>
);
