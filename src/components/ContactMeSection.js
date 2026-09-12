import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
import { trackProfileLink } from "../analytics";

const linkedinUrl =
  "https://www.linkedin.com/in/yeinier-valdes-8a5390267";

const ContactMeSection = () => {
  const { isLoading, response, submit, clearResponse } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter your name."),
      email: Yup.string()
        .email("Enter a valid email address.")
        .required("Please enter your email."),
      message: Yup.string()
        .min(25, "Please write at least 25 characters.")
        .required("Please enter a message."),
    }),
    onSubmit: (values) => submit("/api/submit", values),
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

  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field];

  return (
    <section className="section contact-section" id="contactme-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p>
            I&apos;m open to opportunities in business intelligence, data
            analytics, and modern web development.
          </p>

          <div className="contact-details">
            <a href="mailto:yeinierv@gmail.com">yeinierv@gmail.com</a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackProfileLink({
                  eventName: "linkedin_click",
                  linkUrl: linkedinUrl,
                  linkLocation: "contact",
                  linkText: "LinkedIn",
                })
              }
            >
              LinkedIn ↗
            </a>
            <span>Miami, Florida</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={formik.handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(fieldError("name"))}
                aria-describedby={fieldError("name") ? "name-error" : undefined}
                {...formik.getFieldProps("name")}
              />
              {fieldError("name") && (
                <p className="field-error" id="name-error">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(fieldError("email"))}
                aria-describedby={
                  fieldError("email") ? "email-error" : undefined
                }
                {...formik.getFieldProps("email")}
              />
              {fieldError("email") && (
                <p className="field-error" id="email-error">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="form-field form-field--wide">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Tell me a little about the opportunity or project."
                aria-invalid={Boolean(fieldError("message"))}
                aria-describedby={
                  fieldError("message") ? "message-error" : undefined
                }
                {...formik.getFieldProps("message")}
              />
              {fieldError("message") && (
                <p className="field-error" id="message-error">
                  {formik.errors.message}
                </p>
              )}
            </div>
          </div>

          <button
            className="button button--primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactMeSection;
