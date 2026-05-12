import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc, web }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack
      bg="#111A29"
      color="white"
      borderRadius="18px"
      cursor="pointer"
      as="a"
      href={web}
      target="_blank"
      rel="noopener noreferrer"
      alignItems="stretch"
      overflow="hidden"
      border="1px solid rgba(120, 147, 214, 0.16)"
      boxShadow="0 18px 44px rgba(3, 11, 24, 0.28)"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "rgba(120, 147, 214, 0.3)",
      }}
      transition="transform 0.2s ease, border-color 0.2s ease"
    >
      <Image src={imageSrc} alt={title} h="150px" objectFit="cover" />
      <VStack spacing={3} p={4} alignItems="flex-start" width="100%">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading as="h3" size="sm">
            {title}
          </Heading>
        </HStack>
        <Box
          maxH="96px"
          overflowY="auto"
          pr={1}
          width="100%"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255,255,255,0.06)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(96, 120, 162, 0.95)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(118, 144, 190, 0.98)",
            },
            scrollbarColor: "rgba(96, 120, 162, 0.95) rgba(255,255,255,0.06)",
            scrollbarWidth: "thin",
          }}
        >
          <Text color="rgba(223, 232, 255, 0.72)" fontSize="sm">
            {description}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

export default Card;
