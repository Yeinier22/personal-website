import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  Box,
  HStack,
  IconButton,
  Link,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons"; //npm install @chakra-ui/icons

const socials = [
  {
    icon: faGithub,
    url: "https://github.com/Yeinier22/personal-website.git",
    label: "GitHub",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
    label: "LinkedIn",
  },
];

const navItems = [
  { label: "Home", anchor: "home" },
  { label: "Projects", anchor: "projects" },
  { label: "About", anchor: "about" },
  { label: "Skills", anchor: "skills" },
  { label: "Contact", anchor: "contactme" },
];

const Header = () => {
  const headerRef = useRef(null);

  const handleClick = (anchor) => (e) => {
    e.preventDefault();

    if (anchor === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const prevScrollY = headerRef.current.prevScrollY;

    if (currentScrollY > prevScrollY) {
      // Scroll hacia abajo
      headerRef.current.prevScrollY = currentScrollY;
      headerRef.current.style.top = "-200px";
    } else {
      // Scroll hacia arriba
      headerRef.current.prevScrollY = currentScrollY;
      headerRef.current.style.top = "0";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        ref={headerRef}
        position="fixed"
        top={0}
        left={0}
        right={0}
        transition="top 0.3s ease-in-out"
        bg="#050505"
        zIndex="999"
        height="auto"
        borderBottom="1px solid rgba(255, 255, 255, 0.16)"
      >
        <Box color="white" maxW="1440px" mx="auto" px={[4, 6, 10]} py={4}>
          <HStack justify="space-between" align="center">
            <HStack spacing={3} align="center">
              <Box
                as="button"
                type="button"
                onClick={handleClick("home")}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minW="44px"
                h="44px"
                px={3}
                borderRadius="12px"
                bg="transparent"
                color="#4B82EA"
                fontWeight="800"
                fontSize="2xl"
                letterSpacing="-0.04em"
              >
                YV
              </Box>
              <Text
                color="white"
                fontWeight="700"
                fontSize={{ base: "lg", md: "2xl" }}
                letterSpacing="-0.03em"
              >
                Yeinier Valdes
              </Text>
            </HStack>

            <HStack spacing={10} display={["none", "flex"]} align="center">
              <HStack spacing={8} as="nav">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={`/#${item.anchor}`}
                    onClick={handleClick(item.anchor)}
                    color="white"
                    fontWeight="500"
                    fontSize="md"
                    position="relative"
                    pb={2}
                    _hover={{ color: "#4B82EA", textDecoration: "none" }}
                    _after={
                      item.anchor === "home"
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: "2px",
                            borderRadius: "full",
                            bg: "#4B82EA",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                ))}
              </HStack>

              <HStack spacing={4}>
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.url}
                    isExternal
                    color="white"
                    aria-label={social.label}
                    fontSize="2xl"
                    _hover={{ color: "#4B82EA" }}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </Link>
                ))}
              </HStack>
            </HStack>

            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              display={["flex", "none"]}
              onClick={onOpen}
              variant="ghost"
              color="white"
              fontSize="2xl"
              _hover={{ bg: "rgba(255,255,255,0.08)" }}
            />
          </HStack>
        </Box>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="#050505" color="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px solid rgba(255,255,255,0.12)">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch" mt={8} fontSize="lg">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={`/#${item.anchor}`}
                  onClick={(e) => {
                    handleClick(item.anchor)(e);
                    onClose();
                  }}
                  _hover={{ color: "#4B82EA", textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}

              <HStack spacing={5} pt={4}>
                {socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.url}
                    isExternal
                    aria-label={social.label}
                    fontSize="2xl"
                    _hover={{ color: "#4B82EA" }}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Header;
