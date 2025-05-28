import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Yeinier!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
    flexDirection="column"
    textAlign="center"
  >
    <Avatar
       size={["xl", "2xl"]}
      name="Yeinier Valdes"
      src="https://i.pravatar.cc/150?img=7"
    />
    <VStack spacing={10}>
      <Heading as="h1"  size={["md", "lg", "xl"]}>
        {greeting}
      </Heading>
      <Heading size={["sm", "md", "lg"]}>{bio1}</Heading>
    </VStack>
    <Heading size={["sm", "md", "lg"]}>{bio2}</Heading>
  </FullScreenSection>
);

export default LandingSection;
