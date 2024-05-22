import { ReactNode, useRef, useState } from "react";
import { Box, Grid, Modal } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

type BasicModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function BasicModal(props: BasicModalProps) {
  const { children, open, onClose } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  // Set fixed values for minWidth and maxWidth
  const [modalSize] = useState({
    minWidth: "400px",
    maxWidth: "1200px",
  });

  return (
    <div>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ ...style, ...modalSize }}>
          <Grid container>
            <Grid item xs={11.8} ref={contentRef}>
              {children}
            </Grid>
            <Grid item xs={0.2} display="flex" justifyContent="flex-end">
              <CloseIcon onClick={onClose} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

// import { ReactNode, useEffect, useRef, useState } from "react";
// import { Box, Button, Grid, Modal } from "@mui/material/";
// import CloseIcon from "@mui/icons-material/Close";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   overflowY: "auto",
// };

// type BasicModalProps = {
//   children: ReactNode;
//   open: boolean;
//   onClose: () => void;
// };

// export default function BasicModal(props: BasicModalProps) {
//   const { children, open, onClose } = props;
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [modalSize, setModalSize] = useState({
//     minWidth: "70vw",
//     maxWidth: "90vw",
//   });

//   useEffect(() => {
//     if (contentRef.current) {
//       const contentWidth = contentRef.current.offsetWidth;
//       const minWidth = Math.min(contentWidth + 64, 800); // Adds padding
//       const maxWidth = Math.min(minWidth + 200, 1200); // Sets max width
//       console.log("modal maxWidth: ", maxWidth);
//       setModalSize({
//         minWidth: `${minWidth}px`,
//         maxWidth: `${maxWidth}px`,
//       });
//     }
//   }, [children, contentRef.current]);

//   if (!open) {
//     return null;
//   }

//   return (
//     <div>
//       <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//         <Box sx={{ ...style, ...modalSize }}>
//           <Grid container>
//             <Grid item xs={11.8} ref={contentRef}>
//               {children}
//             </Grid>
//             <Grid item xs={0.2} display="flex" justifyContent="flex-end">
//               <CloseIcon onClick={onClose} />
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
