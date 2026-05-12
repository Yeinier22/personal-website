import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faGlobe } from "@fortawesome/free-solid-svg-icons";
import FullScreenSection from "./FullScreenSection";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Flight Finder",
    description:
      "Full-featured flight search engine using the Amadeus API. Users can search, filter, and compare flight options in real time with a modern responsive UI. ",
    getImageSrc: () => require("../images/flight.jpg"),
    web: "https://flightfinder2025.netlify.app/",
  },
  {
    title: "Movie Explorer",
    description:
      "A React-based application that consumes The Movie Database (TMDb) API to display trending movies dynamically. It features a real-time search bar with instant suggestions as you type, and implements infinite scroll to automatically load more movies as the user scrolls down.",
    getImageSrc: () => require("../images/movie.jpg"),
    web: "https://movies-yeinier.netlify.app/",
  },
  {
    title: "Little Lemon Restaurant Website",
    description:
      "A responsive React-based restaurant website featuring a reservation system with realistic availability simulation. Users can select the date, time, and number of guests, and the app determines table availability dynamically, mimicking a real API response. The interface adapts to both desktop and mobile views, and includes sections for the weekly specials, testimonials, and general information.",
    getImageSrc: () => require("../images/restaurant.jpg"),
    web: "https://little-lemmon-yeinier.netlify.app/",
  },
  {
    title: "Taskify - Coming Soon",
    description:
      /*"A task-tracking app built with React and Firebase. Users can register, log in, and manage their personal task list with full CRUD operations. The app includes protected routes, mobile-friendly design, and real-time state updates.",*/
      "This project is currently under development. It will include user authentication, protected routes, and full CRUD functionality using Firebase.",
    getImageSrc: () => require("../images/login.jpg"),
  },
];

const ProjectsSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const featuredBiProject = {
    title: "Banking Analytics Dashboard",
    description:
      "Interactive banking analytics dashboard built with Power BI, DAX, SQL, and custom visuals. Designed to analyze customer demographics, financial health, transactions, and behavioral trends through cross-filtering and modern data storytelling.",
    imageSrc: require("../images/Banking/Transactions.png"),
    web: "https://app.powerbi.com/view?r=eyJrIjoiNDViZTEwYWYtZDRjZS00YjQyLTk4NWUtMmUzYjExNzhlNDIwIiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
  };

  return (
    <FullScreenSection
      backgroundColor="#0B1422"
      isDarkBackground
      py={{ base: 12, md: 16 }}
      alignItems="flex-start"
      spacing={8}
      minHeight="auto"
    >
      <Box
        id="projects-section"
        display="grid"
        gridTemplateColumns="1fr"
        gap={{ base: 12, xl: 14 }}
        width="100%"
        alignItems="start"
      >
        <VStack align="stretch" spacing={5}>
          <Box>
            <HStack spacing={3} align="center">
              <Box color="#4B82EA" fontSize={{ base: "xl", md: "2xl" }}>
                <FontAwesomeIcon icon={faChartColumn} />
              </Box>
              <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
                BI & Analytics Projects
              </Heading>
            </HStack>
            <Text mt={2} color="rgba(223, 232, 255, 0.72)" fontSize="lg">
              Dashboards and analytics solutions built with Power BI.
            </Text>
          </Box>

          <Box
            bg="#111A29"
            borderRadius="24px"
            border="1px solid rgba(120, 147, 214, 0.18)"
            p={{ base: 5, md: 6 }}
            h={{ base: "auto", md: "330px", xl: "360px" }}
            boxShadow="0 18px 44px rgba(3, 11, 24, 0.34)"
          >
            <HStack
              align="stretch"
              spacing={{ base: 5, md: 6 }}
              flexDirection={{ base: "column", md: "row" }}
              h="100%"
            >
              <Image
                src={featuredBiProject.imageSrc}
                alt={featuredBiProject.title}
                width={{ base: "100%", md: "52%" }}
                h={{ base: "220px", md: "100%" }}
                objectFit="cover"
                borderRadius="18px"
                border="1px solid rgba(124, 160, 234, 0.16)"
              />

              <VStack
                align="flex-start"
                spacing={4}
                flex="1"
                h="100%"
                minH="0"
                overflow="hidden"
              >
                <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
                  {featuredBiProject.title}
                </Heading>
                <Box
                  flex="1"
                  minH="0"
                  overflowY={{ base: "visible", md: "auto" }}
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
                  <Text color="rgba(223, 232, 255, 0.72)" lineHeight="1.8">
                    {featuredBiProject.description}
                  </Text>
                </Box>
                <VStack align="flex-start" spacing={2} color="#DCE8FF" flexShrink={0}>
                  <Text>Data Modeling</Text>
                  <Text>DAX Measures</Text>
                  <Text>Interactive Reports</Text>
                </VStack>
                <HStack pt={4} mt="auto" spacing={4} flexWrap="wrap" flexShrink={0}>
                  <Button
                    as="a"
                    href={featuredBiProject.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="#4B82EA"
                    color="white"
                    _hover={{ bg: "#5C8EF0" }}
                  >
                    View Live
                  </Button>
                  <Button
                    variant="ghost"
                    bg="rgba(255,255,255,0.08)"
                    color="#E8F0FF"
                    border="1px solid rgba(132, 168, 255, 0.16)"
                    _hover={{ bg: "rgba(255,255,255,0.14)" }}
                    onClick={onOpen}
                  >
                    View Details
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>

        <VStack align="stretch" spacing={5}>
          <Box>
            <HStack spacing={3} align="center">
              <Box color="#4B82EA" fontSize={{ base: "xl", md: "2xl" }}>
                <FontAwesomeIcon icon={faGlobe} />
              </Box>
              <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
                Web Applications
              </Heading>
            </HStack>
            <Text mt={2} color="rgba(223, 232, 255, 0.72)" fontSize="lg">
              Modern, responsive web apps built with React.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={5}>
            {projects.map((project) => (
              <Card
                key={project.title}
                title={project.title}
                web={project.web}
                description={project.description}
                imageSrc={project.getImageSrc()}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay bg="rgba(4, 10, 20, 0.72)" backdropFilter="blur(6px)" />
        <ModalContent bg="#111A29" color="white" border="1px solid rgba(120, 147, 214, 0.22)">
          <ModalHeader>Banking Analytics Dashboard</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={6}>
              <Text color="rgba(223, 232, 255, 0.82)" lineHeight="1.8">
                Interactive Power BI dashboard designed to analyze customer demographics, financial health, transactions, and behavioral patterns through modern data visualization and cross-filtering analytics.
              </Text>

              <Text color="rgba(223, 232, 255, 0.82)" lineHeight="1.8">
                The project combines advanced Power BI development with custom visual design to create an intuitive and business-focused reporting experience.
              </Text>

              <Box>
                <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                  Key Insights
                </Heading>
                <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                  <ListItem>Customer demographics analysis by age, gender, and income groups</ListItem>
                  <ListItem>Financial health metrics including debt, risk score, and DTI ratio</ListItem>
                  <ListItem>Transaction trends, payment methods, and geographic activity</ListItem>
                  <ListItem>Interactive drill-down exploration across multiple report sections</ListItem>
                  <ListItem>Cross-filtering visuals for dynamic business analysis</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                  Technologies Used
                </Heading>
                <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                  <ListItem>Power BI</ListItem>
                  <ListItem>DAX</ListItem>
                  <ListItem>SQL</ListItem>
                  <ListItem>Data Modeling</ListItem>
                  <ListItem>Custom Visual Development</ListItem>
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                  Features
                </Heading>
                <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                  <ListItem>Interactive navigation experience</ListItem>
                  <ListItem>Custom-designed visuals</ListItem>
                  <ListItem>Responsive dashboard layout</ListItem>
                  <ListItem>Business-oriented storytelling</ListItem>
                  <ListItem>Multi-page analytical structure</ListItem>
                </UnorderedList>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FullScreenSection>
  );
};

export default ProjectsSection;
