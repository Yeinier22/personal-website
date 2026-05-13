import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const AboutSection = () => {
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#091426"
      py={{ base: 10, md: 12 }}
      spacing={6}
      minHeight="auto"
    >
      <VStack
        id="about-section"
        spacing={5}
        align="flex-start"
        width="100%"
        maxW="880px"
      >
        <Box
          width="100%"
          bg="rgba(10, 20, 37, 0.78)"
          border="1px solid rgba(75, 130, 234, 0.16)"
          borderRadius="24px"
          px={{ base: 5, md: 7 }}
          py={{ base: 6, md: 7 }}
          boxShadow="0 18px 44px rgba(2, 9, 21, 0.24)"
        >
          <VStack align="flex-start" spacing={4}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", md: "4xl" }}
              lineHeight="1.1"
              letterSpacing="-0.04em"
            >
              About <Box as="span" color="#4B82EA">Me</Box>
            </Heading>

            <Text
              color="rgba(223, 232, 255, 0.8)"
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="1.8"
              maxW="760px"
            >
              BI Developer focused on Power BI, data visualization, and modern
              web applications with React.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default AboutSection;