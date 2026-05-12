import { Box, Heading, Text } from "@chakra-ui/react";
import { useAlertContext } from "../context/alertContext";

/**
 * This is a global component that uses context to display a global alert message.
 */
function Alert() {
  const { isOpen, type, message } = useAlertContext();
  const isSuccess = type === "success";

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={{ base: 24, md: 28 }}
      left="50%"
      transform="translateX(-50%)"
      zIndex="1400"
      width={{ base: "calc(100% - 2rem)", md: "520px" }}
      px={7}
      py={6}
      borderRadius="16px"
      backgroundColor={isSuccess ? "#81C784" : "#FF8A65"}
      color="#111827"
      boxShadow="0 20px 50px rgba(0, 0, 0, 0.28)"
    >
      <Heading fontSize="2xl" fontWeight="bold" mb={4}>
        {isSuccess ? "All good!" : "Oops!"}
      </Heading>
      <Text fontSize="xl" lineHeight="1.6">
        {message}
      </Text>
    </Box>
  );
}

export default Alert;
