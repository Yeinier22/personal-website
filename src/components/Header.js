import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import {
  Box,
  HStack,
  IconButton,
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
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const handleClick = (anchor) => (e) => {
    e.preventDefault();
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
      headerRef.current.style.transform = "translateY(-200px)";
    } else {
      // Scroll hacia arriba
      headerRef.current.prevScrollY = currentScrollY;
      headerRef.current.style.transform = "translateY(0)";
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
        transform="translateY(0)"
        transition="transform 0.3s ease-in-out"
        bg="#18181b"
        zIndex="999"
        height="auto" // puedes también probar con un valor fijo como 64px si lo prefieres
      >
        <Box color="white" maxW="1280px" mx="auto" px={[4, 16]} py={4}>
          <HStack justify="space-between" align="center">
            {/* Íconos sociales: ocultos en mobile */}
            <HStack display={["none", "flex"]}>
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  style={{ marginRight: "1rem" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
              ))}
            </HStack>

            {/* Enlaces: ocultos en mobile */}
            <HStack spacing={8} display={["none", "flex"]}>
              <a href="/#contact-me" onClick={handleClick("contactme")}>
                Contact Me
              </a>
              <a href="/#projects" onClick={handleClick("projects")}>
                Project
              </a>
            </HStack>

            {/* Botón hamburguesa: solo visible en mobile */}
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              display={["flex", "none"]}
              onClick={onOpen}
              variant="ghost"
              color="white"
              fontSize="2xl"
            />
          </HStack>
        </Box>
      </Box>

      {/* Drawer para mobile */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full" >
  <DrawerOverlay />
  <DrawerContent bg="#18181b" color="white">
    <DrawerCloseButton />
    <DrawerHeader>Menu</DrawerHeader>
    <DrawerBody>
     <VStack spacing={6} align="start" mt={4} fontSize="lg">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={social.icon} size="lg" />
          </a>
        ))}
        <a href="/#contact-me" onClick={(e) => { handleClick("contactme")(e); onClose(); }}>
          Contact Me
        </a>
        <a href="/#projects" onClick={(e) => { handleClick("projects")(e); onClose(); }}>
          Project
        </a>
      </VStack>
    </DrawerBody>
  </DrawerContent>
</Drawer>
    </>
  );
};
export default Header;
