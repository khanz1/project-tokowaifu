import { Box } from "@mantine/core";
import AuthenticationButton from "./AuthenticationButton";
import Menu from "./Menu";

export function TopHeader() {
  return (
    <Box>
      <Menu>
        <AuthenticationButton />
      </Menu>
    </Box>
  );
}
