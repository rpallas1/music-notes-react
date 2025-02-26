import React from "react";
import { useLocation } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import useOverlay from "../hooks/useOverlay";
import Input from "../components/Input";
import FormSuccess from "../components/FormSuccess";
import {
  textAreaValidations,
  emailValidations,
  textValidations,
} from "../utils/formValidations";

export default function Contact() {
  const location = useLocation();
  const methods = useForm();
  const [formData, setFormData] = React.useState(null);
  const { isOpen: showSuccess, handleToggle: toggleSuccessVisibility } =
    useOverlay();

  const onSubmit = methods.handleSubmit((data) => {
    methods.reset();
    setFormData(data);
    toggleSuccessVisibility();

    const formType = location.pathname.split("/").pop();
    localStorage.removeItem(`${formType}-form-data`);
  });

  const nameValidation = textValidations("name", "Name", 50, true);
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
          />
        </>
      )}
    </section>
  );
}
