import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ open, message, handleClose, autoHideDuration }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
