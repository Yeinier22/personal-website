import * as React from "react";
import { VStack } from "@chakra-ui/react";

const FullScreenSection = ({ children, isDarkBackground, ...boxProps }) => {
  return (
    <VStack
      backgroundColor={boxProps.backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      width="100%"
      maxW="100vw"
      overflowX="hidden"
    >
      <VStack
        width="100%"
        maxWidth="1280px"
        minHeight="100vh"
        paddingX={[4, 8]} // padding horizontal para mobile y desktop
        {...boxProps}
      >
        {children}
      </VStack>
    </VStack>
  );
};

export default FullScreenSection;
