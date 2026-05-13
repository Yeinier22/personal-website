import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faChartSimple,
  faCode,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const skillGroups = [
  {
    title: "BI & Data Analytics",
    icon: faChartSimple,
    items: [
      {
        name: "Power BI",
        subtitle: "Data Visualization",
        type: "image",
        src: `${process.env.PUBLIC_URL}/Microsoft-Power-BI-Logo.png`,
        alt: "Power BI logo",
      },
      {
        name: "DAX",
        subtitle: "Data Analysis",
        type: "custom",
        renderIcon: () => (
          <Box
            w="56px"
            h="56px"
            borderRadius="14px"
            border="2px solid #3BAA2C"
            color="#68D353"
            display="grid"
            placeItems="center"
            position="relative"
          >
            <Text fontSize="xs" fontWeight="800" letterSpacing="0.08em">
              DAX
            </Text>
            <Box position="absolute" inset="9px" border="1px solid rgba(104, 211, 83, 0.35)" borderRadius="10px" />
          </Box>
        ),
      },
      {
        name: "Power Query",
        subtitle: "ETL",
        type: "custom",
        renderIcon: () => (
          <Box
            w="56px"
            h="56px"
            borderRadius="14px"
            bg="linear-gradient(180deg, #6ACB4A 0%, #4C9E34 100%)"
            color="white"
            display="grid"
            placeItems="center"
            boxShadow="inset 0 1px 0 rgba(255,255,255,0.18)"
          >
            <Text fontSize="lg" fontWeight="800" letterSpacing="-0.04em">
              PQ
            </Text>
          </Box>
        ),
      },
      {
        name: "SQL",
        subtitle: "Querying",
        type: "custom",
        renderIcon: () => (
          <Box
            w="56px"
            h="56px"
            borderRadius="full"
            bg="linear-gradient(180deg, #4EC8FF 0%, #2E7CC8 100%)"
            color="white"
            display="grid"
            placeItems="center"
            fontSize="md"
            fontWeight="800"
            letterSpacing="-0.03em"
            boxShadow="0 10px 22px rgba(40, 124, 200, 0.32)"
          >
            SQL
          </Box>
        ),
      },
      {
        name: "Snowflake",
        subtitle: "Data Warehouse",
        type: "image",
        src: "https://cdn.simpleicons.org/snowflake/29B5E8",
        alt: "Snowflake logo",
      },
    ],
  },
  {
    title: "Frontend Development",
    icon: faCode,
    items: [
      {
        name: "React",
        subtitle: "Library",
        type: "image",
        src: "https://cdn.simpleicons.org/react/61DAFB",
        alt: "React logo",
      },
      {
        name: "JavaScript",
        subtitle: "Language",
        type: "image",
        src: "https://cdn.simpleicons.org/javascript/F7DF1E",
        alt: "JavaScript logo",
      },
      {
        name: "HTML5",
        subtitle: "Markup",
        type: "image",
        src: "https://cdn.simpleicons.org/html5/E34F26",
        alt: "HTML5 logo",
      },
      {
        name: "CSS3",
        subtitle: "Styling",
        type: "image",
        src: "https://cdn.simpleicons.org/css/1572B6",
        alt: "CSS3 logo",
      },
      {
        name: "Tailwind CSS",
        subtitle: "Framework",
        type: "image",
        src: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        alt: "Tailwind CSS logo",
      },
      {
        name: "Chakra UI",
        subtitle: "Component Library",
        type: "image",
        src: "https://cdn.simpleicons.org/chakraui/319795",
        alt: "Chakra UI logo",
      },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: faScrewdriverWrench,
    items: [
      {
        name: "Git",
        subtitle: "Version Control",
        type: "image",
        src: "https://cdn.simpleicons.org/git/F05032",
        alt: "Git logo",
      },
      {
        name: "GitHub",
        subtitle: "Code Hosting",
        type: "custom",
        renderIcon: () => (
          <Box
            w="56px"
            h="56px"
            borderRadius="full"
            bg="white"
            display="grid"
            placeItems="center"
          >
            <Image src="https://cdn.simpleicons.org/github/111111" alt="GitHub logo" w="30px" h="30px" />
          </Box>
        ),
      },
      {
        name: "VS Code",
        subtitle: "IDE",
        type: "image",
        src: `${process.env.PUBLIC_URL}/Visual_Studio_Icon_2022.svg.png`,
        alt: "Visual Studio Code logo",
      },
      {
        name: "Figma",
        subtitle: "UI/UX Design",
        type: "image",
        src: "https://cdn.simpleicons.org/figma/F24E1E",
        alt: "Figma logo",
      },
      {
        name: "Netlify",
        subtitle: "Deployment",
        type: "image",
        src: "https://cdn.simpleicons.org/netlify/00C7B7",
        alt: "Netlify logo",
      },
      {
        name: "npm",
        subtitle: "Package Manager",
        type: "image",
        src: "https://cdn.simpleicons.org/npm/CB3837",
        alt: "npm logo",
      },
    ],
  },
];

const SkillCard = ({ item }) => (
  <GridItem>
    <HStack
      spacing={4}
      align="center"
      bg="rgba(10, 20, 37, 0.72)"
      border="1px solid rgba(75, 130, 234, 0.12)"
      borderRadius="16px"
      px={{ base: 4, md: 5 }}
      py={4}
      minH="108px"
      boxShadow="inset 0 1px 0 rgba(255,255,255,0.02)"
    >
      <Box flexShrink={0} display="grid" placeItems="center" w="58px" h="58px">
        {item.type === "image" ? (
          <Image src={item.src} alt={item.alt} w="44px" h="44px" objectFit="contain" />
        ) : (
          item.renderIcon()
        )}
      </Box>

      <Box>
        <Text color="white" fontWeight="700" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.2">
          {item.name}
        </Text>
        <Text color="rgba(223, 232, 255, 0.62)" fontSize={{ base: "sm", md: "md" }} mt={1}>
          {item.subtitle}
        </Text>
      </Box>
    </HStack>
  </GridItem>
);

const SkillGroup = ({ group }) => (
  <Box
    bg="rgba(7, 17, 33, 0.82)"
    border="1px solid rgba(75, 130, 234, 0.12)"
    borderRadius="24px"
    px={{ base: 4, md: 5 }}
    py={{ base: 5, md: 6 }}
    boxShadow="0 18px 44px rgba(2, 9, 21, 0.28)"
  >
    <HStack spacing={3} mb={5} color="white" align="center">
      <Box color="#4B82EA" fontSize="2xl" w="28px" textAlign="center">
        <FontAwesomeIcon icon={group.icon} />
      </Box>
      <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.03em">
        {group.title}
      </Heading>
    </HStack>

    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: `repeat(${group.items.length > 5 ? 6 : 5}, minmax(0, 1fr))` }}
      gap={4}
    >
      {group.items.map((item) => (
        <SkillCard key={item.name} item={item} />
      ))}
    </Grid>
  </Box>
);

const SkillsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleNavigation = (event) => {
      if (event.detail?.anchor === "skills") {
        setIsExpanded(true);
      }
    };

    window.addEventListener("portfolio:navigate", handleNavigation);

    return () => {
      window.removeEventListener("portfolio:navigate", handleNavigation);
    };
  }, []);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#071121"
      py={{ base: 12, md: 16 }}
      spacing={8}
      minHeight="auto"
    >
      <VStack id="skills-section" spacing={{ base: 8, md: 10 }} align="stretch" width="100%">
        <VStack spacing={4} textAlign="center" maxW="760px" mx="auto">
          <Box
            display="inline-flex"
            alignItems="center"
            minW="132px"
            minH="56px"
            px={5}
            py={2.5}
            borderRadius="full"
            border="1px solid rgba(75, 130, 234, 0.28)"
            bg="rgba(9, 19, 38, 0.85)"
            color="#DCE8FF"
            fontWeight="700"
            letterSpacing="0.08em"
            textTransform="uppercase"
          />

          <Heading as="h2" fontSize={{ base: "4xl", md: "6xl" }} lineHeight={{ base: "1.1", md: "1.02" }} letterSpacing="-0.05em">
            My Skills & <Box as="span" color="#4B82EA">Technologies</Box>
          </Heading>

          <Text color="rgba(223, 232, 255, 0.72)" fontSize={{ base: "lg", md: "2xl" }} lineHeight="1.6">
            Technologies and tools I use to build data solutions and modern web applications.
          </Text>

          <Box w="72px" h="4px" borderRadius="full" bg="#4B82EA" />

          <Button
            mt={2}
            bg="rgba(9, 19, 38, 0.9)"
            color="white"
            border="1px solid rgba(75, 130, 234, 0.28)"
            borderRadius="999px"
            px={6}
            h="52px"
            fontSize="md"
            fontWeight="700"
            rightIcon={<FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />}
            _hover={{ bg: "rgba(14, 27, 52, 0.96)" }}
            onClick={() => setIsExpanded((currentValue) => !currentValue)}
          >
            {isExpanded ? "Hide Skills" : "Show Skills"}
          </Button>
        </VStack>

        <Box
          overflow="hidden"
          maxH={isExpanded ? "2000px" : "0px"}
          opacity={isExpanded ? 1 : 0}
          transform={isExpanded ? "translateY(0)" : "translateY(-16px)"}
          transition="max-height 0.45s ease, opacity 0.3s ease, transform 0.3s ease"
        >
          <VStack spacing={6} align="stretch" pt={isExpanded ? 2 : 0}>
            {skillGroups.map((group) => (
              <SkillGroup key={group.title} group={group} />
            ))}
          </VStack>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default SkillsSection;