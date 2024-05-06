import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material/";
import Icon from "@mdi/react";
import { mdiScale } from "@mdi/js";
import {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  safety3,
  tools1,
  tools2,
  tools3,
} from "../images";

const imageUrls = [
  `equipment1`,
  `equipment2`,
  `glassware1`,
  `glassware2`,
  `materials1`,
  `materials2`,
  `measurement1`,
  `models1`,
  `models2`,
  `models3`,
  `models4`,
  `safety1`,
  `safety2`,
  `safety3`,
  `tools1`,
  `tools2`,
  `tools3`,
  "mdiScale",
];

const example: any = {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  safety3,
  tools1,
  tools2,
  tools3,
};

const renderImage = (imageUrl, index) => {
  if (example[imageUrl] !== undefined) {
    return <img src={example[imageUrl]} alt={`Image ${index}`} style={{ maxWidth: "100%", maxHeight: "100%" }} />;
  } else {
    return <Icon path={mdiScale} size={1} />;
  }
};

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
  initialSelectedImage?: string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect, initialSelectedImage }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(initialSelectedImage);

  const handleImageClick = (imageUrl: string) => {
    onSelect(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  return (
    <Box>
      <Typography variant="h5">Select an Image:</Typography>
      <Box display="flex" flexWrap="wrap">
        {imageUrls.map((imageUrl, index) => (
          <Paper
            key={index}
            sx={{
              width: 50,
              height: 50,
              margin: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: selectedImageUrl === imageUrl ? "2px solid #1976D2" : "2px solid transparent",
            }}
            onClick={() => handleImageClick(`${imageUrl}`)}
          >
            {renderImage(imageUrl, index)}
            {/* <img src={example[imageUrl]} alt={`Image ${index}`} style={{ maxWidth: "100%", maxHeight: "100%" }} /> */}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSelector;
