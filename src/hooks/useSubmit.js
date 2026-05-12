import emailjs from "@emailjs/browser";
import {useState} from "react";

const EMAILJS_PUBLIC_KEY = "aBBNsmXz7062eG3au";
const EMAILJS_SERVICE_ID = "service_pmsqf5p";
const EMAILJS_TEMPLATE_ID = "template_2kh4wzh";

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const clearResponse = () => {
    setResponse(null);
  };

  const submit = async (_url, data) => {
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setResponse({
        type: "success",
        message: `Thanks for your submission ${data.name}, we will get back to you shortly!`,
      });
    } catch (error) {
      setResponse({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit, clearResponse };
}

export default useSubmit;
