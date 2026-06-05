import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faDatabase,
  faGlobe,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
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
  Tag,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
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

const analyticsCategories = [
  {
    title: "Power BI Dashboards",
    description:
      "Interactive business intelligence dashboards focused on analytics, KPIs, and data storytelling using Power BI, DAX, Power Query, and custom visuals.",
    imageSrc: require("../images/Banking/Financial Health.png"),
    icon: faLayerGroup,
    projects: [
      {
        title: "Banking Analytics Dashboard",
        description:
          "Interactive banking analytics dashboard built with Power BI, DAX, SQL, and custom visuals. Designed to analyze customer demographics, financial health, transactions, and behavioral trends through cross-filtering and modern data storytelling.",
        imageSrc: require("../images/Banking/Transactions.png"),
        technologies: [
          "Power BI",
          "DAX",
          "Power Query",
          "SQL",
          "Custom Visuals",
        ],
        web: "https://app.powerbi.com/view?r=eyJrIjoiNDViZTEwYWYtZDRjZS00YjQyLTk4NWUtMmUzYjExNzhlNDIwIiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
        details: [
          "Interactive Power BI dashboard designed to analyze customer demographics, financial health, transactions, and behavioral patterns through modern data visualization and cross-filtering analytics.",
          "The project combines advanced Power BI development with custom visual design to create an intuitive and business-focused reporting experience.",
        ],
        highlightsTitle: "Key Insights",
        highlights: [
          "Customer demographics analysis by age, gender, and income groups",
          "Financial health metrics including debt, risk score, and DTI ratio",
          "Transaction trends, payment methods, and geographic activity",
          "Interactive drill-down exploration across multiple report sections",
          "Cross-filtering visuals for dynamic business analysis",
        ],
        featuresTitle: "Features",
        features: [
          "Interactive navigation experience",
          "Custom-designed visuals",
          "Responsive dashboard layout",
          "Business-oriented storytelling",
          "Multi-page analytical structure",
        ],
      },
    ],
  },
  {
    title: "Data Projects",
    description:
      "Projects involving data extraction, transformation, automation, SQL, Python, APIs, and cloud technologies.",
    imageSrc: require("../images/Airport ETL/Airport ETL Pipeline.png"),
    icon: faDatabase,
    projects: [
      {
        title: "Airport ETL Pipeline",
        description:
          "Automated ETL pipeline built with Python to extract, clean, transform, and load airport data into SQLite and Parquet, with logging, error handling, Docker containerization, and GitHub Actions scheduling.",
        imageSrc: require("../images/Airport ETL/Airport ETL Pipeline.png"),
        links: [
          {
            label: "Live Power BI",
            url: "https://app.powerbi.com/view?r=eyJrIjoiYjdjY2Y1NzEtOWJiZC00YTZhLWJhNGUtYWI0ZWY4N2U0Y2EzIiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9",
          },
          {
            label: "GitHub",
            url: "https://github.com/Yeinier22/airport-etl-pipeline",
          },
        ],
        technologies: [
          "Python",
          "Pandas",
          "SQLite",
          "Parquet",
          "Docker",
          "GitHub Actions",
        ],
        details: [
          "This project demonstrates a complete data engineering workflow using Python. The pipeline extracts airport data from a public CSV source, applies data cleaning and transformation steps, saves optimized Parquet files, loads the processed data into a local SQLite database, and runs automatically using GitHub Actions.",
          "The project also includes logging, error handling, Docker containerization, and a reproducible structure designed for analytics and reporting workflows.",
        ],
        highlightsTitle: "Highlights",
        highlights: [
          "Built an end-to-end ETL pipeline with Python",
          "Cleaned and transformed 85,000+ airport records",
          "Saved processed data as Parquet",
          "Loaded structured data into SQLite",
          "Added logging and error handling",
          "Containerized the pipeline with Docker",
          "Automated execution with GitHub Actions",
        ],
      },
    ],
  },
];

const ProjectsSection = () => {
  const {
    isOpen: isCategoryOpen,
    onOpen: onCategoryOpen,
    onClose: onCategoryClose,
  } = useDisclosure();
  const {
    isOpen: isProjectOpen,
    onOpen: onProjectOpen,
    onClose: onProjectClose,
  } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const openCategory = (category) => {
    setSelectedCategory(category);
    onCategoryOpen();
  };

  const closeCategory = () => {
    setSelectedCategory(null);
    onCategoryClose();
  };

  const openProject = (project) => {
    setSelectedProject(project);
    onProjectOpen();
  };

  const closeProject = () => {
    setSelectedProject(null);
    onProjectClose();
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
                 Data & Analytics Projects
              </Heading>
            </HStack>
            <Text mt={2} color="rgba(223, 232, 255, 0.72)" fontSize="lg">
                Dashboards, ETL pipelines, analytics solutions, and data engineering projects built with Power BI, Python, SQL, and cloud automation.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
            {analyticsCategories.map((category) => (
              <Box
                key={category.title}
                bg="#111A29"
                borderRadius="24px"
                border="1px solid rgba(120, 147, 214, 0.18)"
                overflow="hidden"
                boxShadow="0 18px 44px rgba(3, 11, 24, 0.34)"
                cursor="pointer"
                transition="transform 0.2s ease, border-color 0.2s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  borderColor: "rgba(120, 147, 214, 0.3)",
                }}
                onClick={() => openCategory(category)}
              >
                <Image
                  src={category.imageSrc}
                  alt={category.title}
                  h={{ base: "220px", md: "240px" }}
                  w="100%"
                  objectFit="cover"
                />
                <VStack align="stretch" spacing={4} p={{ base: 5, md: 6 }}>
                  <HStack spacing={3} color="#DCE8FF">
                    <Box color="#4B82EA" fontSize="lg">
                      <FontAwesomeIcon icon={category.icon} />
                    </Box>
                    <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
                      {category.title}
                    </Heading>
                  </HStack>

                  <Text color="rgba(223, 232, 255, 0.72)" lineHeight="1.8">
                    {category.description}
                  </Text>

                  <HStack justify="space-between" align="center" pt={2}>
                    <Text color="#DCE8FF" fontSize="sm">
                      {category.projects.length} project{category.projects.length > 1 ? "s" : ""}
                    </Text>
                    <Button
                      variant="ghost"
                      bg="rgba(255,255,255,0.08)"
                      color="#E8F0FF"
                      border="1px solid rgba(132, 168, 255, 0.16)"
                      _hover={{ bg: "rgba(255,255,255,0.14)" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        openCategory(category);
                      }}
                    >
                      View Projects
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
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

      <Modal isOpen={isCategoryOpen} onClose={closeCategory} isCentered size="5xl" scrollBehavior="inside">
        <ModalOverlay bg="rgba(4, 10, 20, 0.72)" backdropFilter="blur(6px)" />
        <ModalContent
          bg="#111A29"
          color="white"
          border="1px solid rgba(120, 147, 214, 0.22)"
          maxH="calc(100vh - 3rem)"
        >
          <ModalHeader>{selectedCategory?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={6}>
              <Text color="rgba(223, 232, 255, 0.82)" lineHeight="1.8">
                {selectedCategory?.description}
              </Text>

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5}>
                {selectedCategory?.projects.map((project) => (
                  <Box
                    key={project.title}
                    bg="rgba(255,255,255,0.03)"
                    border="1px solid rgba(120, 147, 214, 0.16)"
                    borderRadius="20px"
                    overflow="hidden"
                  >
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      h="220px"
                      w="100%"
                      objectFit="cover"
                    />
                    <VStack align="stretch" spacing={4} p={5}>
                      <Heading as="h4" size="md">
                        {project.title}
                      </Heading>
                      <Text color="rgba(223, 232, 255, 0.78)" lineHeight="1.8">
                        {project.description}
                      </Text>
                      <Wrap spacing={2}>
                        {project.technologies.map((technology) => (
                          <WrapItem key={technology}>
                            <Tag bg="rgba(75, 130, 234, 0.14)" color="#DCE8FF" border="1px solid rgba(132, 168, 255, 0.18)">
                              {technology}
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                      <HStack pt={2} spacing={3} flexWrap="wrap">
                        {project.web && (
                          <Button
                            as="a"
                            href={project.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            bg="#4B82EA"
                            color="white"
                            _hover={{ bg: "#5C8EF0" }}
                          >
                            View Live
                          </Button>
                        )}
                        {project.links?.map((link) => (
                          <Button
                            key={link.url}
                            as="a"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            bg="#4B82EA"
                            color="white"
                            _hover={{ bg: "#5C8EF0" }}
                          >
                            {link.label}
                          </Button>
                        ))}
                        <Button
                          variant="ghost"
                          bg="rgba(255,255,255,0.08)"
                          color="#E8F0FF"
                          border="1px solid rgba(132, 168, 255, 0.16)"
                          _hover={{ bg: "rgba(255,255,255,0.14)" }}
                          onClick={() => openProject(project)}
                        >
                          View Details
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isProjectOpen} onClose={closeProject} isCentered size="3xl" scrollBehavior="inside">
        <ModalOverlay bg="rgba(4, 10, 20, 0.72)" backdropFilter="blur(6px)" />
        <ModalContent
          bg="#111A29"
          color="white"
          border="1px solid rgba(120, 147, 214, 0.22)"
          maxH="calc(100vh - 3rem)"
        >
          <ModalHeader>{selectedProject?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={6}>
              {(selectedProject?.web || selectedProject?.links?.length) && (
                <HStack spacing={3} flexWrap="wrap">
                  {selectedProject?.web && (
                    <Button
                      as="a"
                      href={selectedProject.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      bg="#4B82EA"
                      color="white"
                      _hover={{ bg: "#5C8EF0" }}
                    >
                      View Live
                    </Button>
                  )}
                  {selectedProject?.links?.map((link) => (
                    <Button
                      key={link.url}
                      as="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      bg="#4B82EA"
                      color="white"
                      _hover={{ bg: "#5C8EF0" }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </HStack>
              )}

              {selectedProject?.details.map((paragraph) => (
                <Text key={paragraph} color="rgba(223, 232, 255, 0.82)" lineHeight="1.8">
                  {paragraph}
                </Text>
              ))}

              <Box>
                <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                  {selectedProject?.highlightsTitle || "Highlights"}
                </Heading>
                <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                  {selectedProject?.highlights.map((highlight) => (
                    <ListItem key={highlight}>{highlight}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              <Box>
                <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                  Technologies Used
                </Heading>
                <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                  {selectedProject?.technologies.map((technology) => (
                    <ListItem key={technology}>{technology}</ListItem>
                  ))}
                </UnorderedList>
              </Box>

              {selectedProject?.features && (
                <Box>
                  <Heading as="h4" size="md" mb={3} color="#DCE8FF">
                    {selectedProject.featuresTitle || "Features"}
                  </Heading>
                  <UnorderedList spacing={2} color="rgba(223, 232, 255, 0.82)" ml={5}>
                    {selectedProject.features.map((feature) => (
                      <ListItem key={feature}>{feature}</ListItem>
                    ))}
                  </UnorderedList>
                </Box>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FullScreenSection>
  );
};

export default ProjectsSection;
