import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const carouselImages = [
  {
    src: require("../images/Banking/Demographics.png"),
    alt: "Banking demographics dashboard",
  },
  {
    src: require("../images/Banking/Financial Health.png"),
    alt: "Banking financial health dashboard",
  },
  {
    src: require("../images/Banking/Transactions.png"),
    alt: "Banking transactions dashboard",
  },
  {
    src: require("../images/Banking/Card Details.png"),
    alt: "Banking card details dashboard",
  },
];

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const LandingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <FullScreenSection
      justifyContent="flex-start"
      alignItems="center"
      isDarkBackground
      backgroundColor="#0C192E"
      minHeight={{ base: "calc((100vh - 72px) / 2)", md: "calc((100vh - 77px) / 2)" }}
      pt={{ base: "calc(72px + 1.35rem)", md: "calc(77px + 1.45rem)" }}
      pb={{ base: 9, md: 8 }}
      px={0}
      overflow="hidden"
    >
      <Box
        id="home-section"
        width="100%"
        display="grid"
        gridTemplateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
        gap={{ base: 8, lg: 6 }}
        alignItems="center"
      >
        <VStack align="flex-start" spacing={5} maxW="500px">
          <Box
            px={4}
            py={1.5}
            borderRadius="full"
            bg="rgba(75, 130, 234, 0.22)"
            border="1px solid rgba(75, 130, 234, 0.35)"
            color="#DCE8FF"
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            BI DEVELOPER
          </Box>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl", xl: "6xl" }}
            lineHeight={{ base: "1.08", md: "1.03" }}
            fontWeight="800"
            letterSpacing="-0.05em"
          >
            Turning Data
            <br />
            <Box
              as="span"
              bgGradient="linear(to-r, #4B82EA, #6D86FF)"
              bgClip="text"
            >
              Into Decisions.
            </Box>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "xl" }}
            lineHeight="1.65"
            color="rgba(232, 239, 255, 0.82)"
            maxW="500px"
          >
            BI Developer specialized in Power BI, data visualization and
            building modern web applications with React.
          </Text>

          <HStack spacing={4} flexWrap="wrap">
            <Button
              bg="#4B82EA"
              color="white"
              px={6}
              h="54px"
              borderRadius="14px"
              fontSize="lg"
              fontWeight="700"
              rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
              _hover={{ bg: "#5C8EF0" }}
              onClick={() => scrollToSection("projects-section")}
            >
              Explore Projects
            </Button>

            <Button
              variant="outline"
              color="white"
              borderColor="rgba(255,255,255,0.28)"
              px={6}
              h="54px"
              borderRadius="14px"
              fontSize="lg"
              fontWeight="700"
              rightIcon={<FontAwesomeIcon icon={faEnvelope} />}
              _hover={{
                bg: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.42)",
              }}
              onClick={() => scrollToSection("contactme-section")}
            >
              Contact Me
            </Button>
          </HStack>
        </VStack>

        <VStack spacing={5} width="100%" align="stretch">
          <Box
            position="relative"
            borderRadius={{ base: "24px", md: "28px" }}
            p="0"
            bg="linear-gradient(135deg, rgba(126, 167, 255, 0.95), rgba(74, 126, 234, 0.58) 38%, rgba(54, 92, 177, 0.38) 68%, rgba(126, 167, 255, 0.82))"
            boxShadow="0 0 18px rgba(75, 130, 234, 0.34), 0 0 44px rgba(75, 130, 234, 0.18), 0 24px 60px rgba(7, 16, 35, 0.28)"
            _before={{
              content: '""',
              position: "absolute",
              inset: "-8px",
              borderRadius: "inherit",
              background:
                "radial-gradient(circle at center, rgba(92, 145, 255, 0.24) 0%, rgba(92, 145, 255, 0.12) 48%, transparent 74%)",
              filter: "blur(14px)",
              zIndex: -1,
              pointerEvents: "none",
            }}
            _after={{
              content: '""',
              position: "absolute",
              inset: "-2px",
              borderRadius: "inherit",
              border: "none",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            <Box
              position="relative"
              overflow="hidden"
              borderRadius={{ base: "24px", md: "28px" }}
              bg="linear-gradient(180deg, rgba(16, 28, 50, 0.96) 0%, rgba(10, 18, 34, 0.98) 100%)"
              py={{ base: 2, md: 3 }}
              px={{ base: 1, md: 1.5 }}
            >
              <Box
                display="flex"
                width={`${carouselImages.length * 100}%`}
                transform={`translateX(-${activeIndex * (100 / carouselImages.length)}%)`}
                transition="transform 0.7s ease"
              >
                {carouselImages.map((image) => (
                  <Box
                    key={image.alt}
                    width={`${100 / carouselImages.length}%`}
                    flexShrink={0}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width="100%"
                      height="auto"
                      maxH={{ base: "220px", md: "300px", xl: "330px" }}
                      objectFit="contain"
                      objectPosition="top center"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <HStack justify="center" spacing={3}>
            {carouselImages.map((image, index) => (
              <Box
                key={image.alt}
                as="button"
                type="button"
                onClick={() => setActiveIndex(index)}
                width={index === activeIndex ? "28px" : "12px"}
                height="8px"
                borderRadius="full"
                bg={index === activeIndex ? "#8CB1FF" : "rgba(255,255,255,0.18)"}
                transition="all 0.25s ease"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </HStack>
        </VStack>
      </Box>
    </FullScreenSection>
  );
};

export default LandingSection;
