import React, { useState } from "react";
import { Anchor, Box, Text } from "@mantine/core";

import { useNavbarStyles } from "../../../hooks/styles/use-navbar-styles";
import SignUpModal from "../../modals/SignUpModal";
import ImportDataModal from "../../modals/ImportDataModal";
import NavbarUserData from "./NavbarUserData";

const NavbarUser = () => {
  const { classes } = useNavbarStyles();
  const [opened, setOpened] = useState(false);
  const [importOpened, setImportOpened] = useState(false);
  const isUser = window.localStorage.getItem("userType") === "user";

  const openImportModal = () => setImportOpened(true);

  return (
    <Box sx={{ paddingTop: 10 }}>
      {isUser ? (
        <NavbarUserData />
      ) : (
        <>
          <Box>
            <Text className={classes.guestText}>
              You are using app as a guest. If you want to access full
              functionality, please{" "}
              <Anchor
                onClick={() => setOpened(true)}
                className={classes.anchor}
              >
                register
              </Anchor>
              .
            </Text>
          </Box>
          <ImportDataModal opened={importOpened} setOpened={setImportOpened} />
          <SignUpModal
            opened={opened}
            setOpened={setOpened}
            openImport={openImportModal}
          />
        </>
      )}
    </Box>
  );
};

export default NavbarUser;
