import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Textarea,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit, clearResponse } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    onSubmit: (values) => {
      submit("/api/submit", values);
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      message: Yup.string()
        .required("Required")
        .min(25, "Must be at least 25 characters"),
    }),
  });

  useEffect(() => {
    if (!response) {
      return;
    }

    onOpen(response.type, response.message);

    if (response.type === "success") {
      formik.resetForm();
    }

    clearResponse();
  }, [clearResponse, formik, onOpen, response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#0B1422"
      py={{ base: 12, md: 16 }}
      spacing={8}
      minHeight="auto"
    >
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 10, lg: 12 }}
        width="100%"
        alignItems="start"
      >
        <VStack align="stretch" spacing={8} maxW="440px">
          <Box>
            <Text
              color="#4B82EA"
              fontSize="lg"
              fontWeight="700"
              letterSpacing="0.08em"
              textTransform="uppercase"
              mb={4}
            >
              Contact
            </Text>
            <Heading
              as="h1"
              id="contactme-section"
              fontSize={{ base: "4xl", md: "5xl" }}
              lineHeight="1.05"
              mb={4}
            >
              Get In <Box as="span" color="#4B82EA">Touch</Box>
            </Heading>
            <Text color="rgba(223, 232, 255, 0.72)" fontSize={{ base: "lg", md: "2xl" }} lineHeight="1.7">
              I&apos;m open to opportunities in BI, data analytics, and modern web development.
            </Text>
          </Box>

          <VStack align="stretch" spacing={5}>
            <HStack spacing={4} align="center" py={4} borderBottom="1px solid rgba(255,255,255,0.08)">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="56px"
                h="56px"
                borderRadius="full"
                bg="rgba(75, 130, 234, 0.12)"
                color="#4B82EA"
                boxShadow="0 0 18px rgba(75, 130, 234, 0.22)"
                flexShrink={0}
              >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </Box>
              <Box>
                <Text color="#4B82EA" fontWeight="700" mb={1}>Email</Text>
                <Text color="rgba(223, 232, 255, 0.88)" fontSize="xl">yeinierv@gmail.com</Text>
              </Box>
            </HStack>

            <HStack spacing={4} align="center" py={4} borderBottom="1px solid rgba(255,255,255,0.08)">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="56px"
                h="56px"
                borderRadius="full"
                bg="rgba(75, 130, 234, 0.12)"
                color="#4B82EA"
                boxShadow="0 0 18px rgba(75, 130, 234, 0.22)"
                flexShrink={0}
              >
                <FontAwesomeIcon icon={faLocationDot} size="lg" />
              </Box>
              <Box>
                <Text color="#4B82EA" fontWeight="700" mb={1}>Location</Text>
                <Text color="rgba(223, 232, 255, 0.88)" fontSize="xl">Miami</Text>
              </Box>
            </HStack>
          </VStack>
        </VStack>

        <Box
          as="form"
          onSubmit={formik.handleSubmit}
          bg="#111A29"
          borderRadius="24px"
          border="1px solid rgba(75, 130, 234, 0.28)"
          boxShadow="0 0 20px rgba(75, 130, 234, 0.18), 0 18px 44px rgba(3, 11, 24, 0.34)"
          p={{ base: 5, md: 7 }}
        >
          <VStack spacing={6} align="stretch">
            <FormControl isInvalid={formik.touched.name && formik.errors.name}>
              <FormLabel htmlFor="name" color="white">Name</FormLabel>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                {...formik.getFieldProps("name")}
                h="56px"
                bg="rgba(9, 15, 29, 0.88)"
                borderColor="rgba(255,255,255,0.12)"
                _hover={{ borderColor: "rgba(75,130,234,0.3)" }}
                _focusVisible={{ borderColor: "#4B82EA", boxShadow: "0 0 0 1px #4B82EA" }}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel htmlFor="email" color="white">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                {...formik.getFieldProps("email")}
                h="56px"
                bg="rgba(9, 15, 29, 0.88)"
                borderColor="rgba(255,255,255,0.12)"
                _hover={{ borderColor: "rgba(75,130,234,0.3)" }}
                _focusVisible={{ borderColor: "#4B82EA", boxShadow: "0 0 0 1px #4B82EA" }}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.message && formik.errors.message}>
              <FormLabel htmlFor="message" color="white">Message</FormLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                {...formik.getFieldProps("message")}
                minH="180px"
                resize="vertical"
                bg="rgba(9, 15, 29, 0.88)"
                borderColor="rgba(255,255,255,0.12)"
                _hover={{ borderColor: "rgba(75,130,234,0.3)" }}
                _focusVisible={{ borderColor: "#4B82EA", boxShadow: "0 0 0 1px #4B82EA" }}
              />
              <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              alignSelf="flex-start"
              bg="#4B82EA"
              color="white"
              px={8}
              h="54px"
              borderRadius="14px"
              fontSize="lg"
              fontWeight="700"
              _hover={{ bg: "#5C8EF0" }}
              isDisabled={
                isLoading ||
                !formik.isValid ||
                Object.keys(formik.touched).length === 0
              }
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </FullScreenSection>
  );
};

export default ContactMeSection;
