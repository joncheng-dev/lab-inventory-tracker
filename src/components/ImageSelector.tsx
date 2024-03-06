import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface ImageSelectorProps {
  onSelect: (imageUrl: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>("src/images/contemplative-reptile.jpg");

  const imageUrls = [
    "src/images/equipment-1.png",
    "src/images/equipment-2.png",
    "src/images/glassware-1.png",
    "src/images/glassware-2.png",
    "src/images/materials-1.png",
    "src/images/materials-2.png",
    "src/images/measurement-1.png",
    "src/images/models-1.png",
    "src/images/models-2.png",
    "src/images/models-3.png",
    "src/images/models-4.png",
    "src/images/safety-1.png",
    "src/images/safety-2.png",
    "src/images/tools-1.png",
    "src/images/tools-2.png",
    "src/images/tools-3.png",
  ];

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
              border: selectedImageUrl === imageUrl ? "2px solid #1976D2" : "2px solid transparent", // Highlight selected image
            }}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img src={imageUrl} alt={`Image ${index}`} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSelector;

// import React, { useState } from "react";
// // import { Box, Paper, Typography } from "@mui/material";
// import styled from "styled-components";

// const ImageGridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 10px;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: auto;
//   cursor: pointer;
//   border: 2px solid transparent;

//   &:hover {
//     border: 2px solid blue;
//   }
// `;

// const images = [
//   "src/images/equipment-1.png",
//   "src/images/equipment-2.png",
//   "src/images/glassware-1.png",
//   "src/images/glassware-2.png",
//   "src/images/materials-1.png",
//   "src/images/materials-2.png",
//   "src/images/measurement-1.png",
//   "src/images/models-1.png",
//   "src/images/models-2.png",
//   "src/images/models-3.png",
//   "src/images/models-4.png",
//   "src/images/safety-1.png",
//   "src/images/safety-2.png",
//   "src/images/tools-1.png",
//   "src/images/tools-2.png",
//   "src/images/tools-3.png",
// ];

// type ImageSelectorProps = {
//   onSelect: (selectedImage: string) => void;
// };

// const ImageSelector: React.FC<ImageSelectorProps> = ({ onSelect }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const handleImageClick = (image: string) => {
//     setSelectedImage(image);
//     onSelect(image);
//   };

//   return (
//     <ImageGridContainer>
//       {images.map((image, index) => (
//         <Image
//           key={index}
//           src={image}
//           alt={`Image ${index + 1}`}
//           onClick={() => handleImageClick(image)}
//           style={{ border: selectedImage === image ? "2px solid blue" : "2px solid transparent" }}
//         />
//       ))}
//     </ImageGridContainer>
//   );
// };

// export default ImageSelector;
