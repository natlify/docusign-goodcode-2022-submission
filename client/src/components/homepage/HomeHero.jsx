import React, { useState, useContext } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  BackgroundImage,
  Anchor,
} from "@mantine/core";
import { useHomeHeroStyles } from "../../hooks/styles/use-homepage-styles";
import { UserContext } from "../../UserContext";
import SignUpModal from "../modals/SignUpModal";
import spanImage from "../../assets/span.png";
import homeImage from "../../assets/homeImage.svg";
import ImportDataModal from "../modals/ImportDataModal";

const HomeHero = () => {
  const [importOpened, setImportOpened] = useState(false);
  const [opened, setOpened] = useState(false);
  const { classes } = useHomeHeroStyles();

  const openImportModal = () => setImportOpened(true);
  const { setGuest } = useContext(UserContext);

  const handleGuestMode = () => setGuest();

  return (
    <Box className={classes.container}>
      <Box className={classes.leftSide}>
        <Text className={classes.title}>
          Manage your time with{" "}
          <Box
            sx={{
              display: "inline-block",
            }}
          >
            <BackgroundImage
              src={spanImage}
              sx={{
                objectFit: "fill",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
              }}
            >
              <Text component="span" className={classes.title}>
                ease
              </Text>
            </BackgroundImage>
          </Box>
        </Text>
        <Box className={classes.buttonContainer}>
          <Button
            size="sm"
            className={classes.button}
            onClick={() => setOpened(true)}
          >
            Get started
          </Button>
          <Anchor className={classes.guestAnchor} onClick={handleGuestMode}>
            Use as a guest
          </Anchor>
        </Box>
      </Box>
      <Box className={classes.imageContainer}>
        <Image className={classes.image} src={homeImage} withPlaceholder />
      </Box>
      <ImportDataModal opened={importOpened} setOpened={setImportOpened} />
      <SignUpModal
        opened={opened}
        setOpened={setOpened}
        openImport={openImportModal}
      />
    </Box>
  );
};

export default HomeHero;
