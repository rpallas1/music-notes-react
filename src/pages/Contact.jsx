import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import useOverlay from "../hooks/useOverlay";
import useFormType from "../hooks/useFormType";
import Input from "../components/Input";
import FormSuccess from "../components/FormSuccess";
import {
  textAreaValidations,
  emailValidations,
  textValidations,
} from "../utils/formValidations";
import { createContactForm } from "../utils/api";

export default function Contact() {
  const methods = useForm();
  const formType = useFormType();
  const [formData, setFormData] = React.useState(null);
  const { isOpen: showSuccess, handleToggle: toggleSuccessVisibility } =
    useOverlay();
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] =
    React.useState(true);

  const onSubmit = methods.handleSubmit((data) => {
    createContactForm(data)
      .then(() => {
        methods.reset();
        setIsSuccessfulSubmission(true);
        localStorage.removeItem(`${formType}-form-data`);
      })
      .catch((err) => {
        console.error(err);
        setIsSuccessfulSubmission(false);
      })
      .finally(() => {
        setFormData(data);
        toggleSuccessVisibility();
      });
  });

  const nameValidation = textValidations("name", "Name", 100, true);
  const emailValidation = emailValidations(true);
  const messageValidation = textAreaValidations(
    "message",
    "Message",
    10000,
    true,
  );

  return (
    <section className="contact-page">
      <h2>Contact Us</h2>
      <p className="form-description">
        Have questions, comments, or concerns? Feel free to reach out and
        we&apos;ll try to respond in 1-2 business days.
      </p>
      <FormProvider {...methods}>
        <form
          action="POST"
          id="contact-form"
          className="form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <Input {...nameValidation} />
          <Input {...emailValidation} />
          <Input {...messageValidation} />
          <input
            type="submit"
            value="Submit"
            className="link-btn"
            onClick={onSubmit}
          />
        </form>
      </FormProvider>
      {showSuccess && (
        <>
          <div className="overlay" onClick={toggleSuccessVisibility}></div>
          <FormSuccess
            formData={formData}
            type="contact"
            closeForm={toggleSuccessVisibility}
            success={isSuccessfulSubmission}
          />
        </>
      )}
    </section>
  );
}
