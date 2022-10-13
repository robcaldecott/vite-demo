import { Box } from "@mui/material";

export function Fallback() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/vite.svg" alt="Vite logo" width={200} />
    </Box>
  );
}
