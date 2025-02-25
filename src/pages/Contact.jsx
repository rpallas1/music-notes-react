import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../components/Input";
import {
  textAreaValidations,
  emailValidations,
  textValidations,
} from "../utils/formValidations";

export default function Contact() {
  const methods = useForm();
  const [formData, setFormData] = React.useState(null);

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    setFormData(data);
    methods.reset();
  });

  const nameValidation = textValidations("name", "Name", 50, true);
  const emailValidation = emailValidations(true);
  const messageValidation = textAreaValidations(
    "message",
    "Message",
    2000,
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
      {/* TODO: Show success message when form submitted */}
      {formData && (
        <div className="form-data">
          <h3>Form Data</h3>
          <p>Name: {formData.Name}</p>
          <p>Email: {formData.Email}</p>
          <p>Message: {formData.Message}</p>
        </div>
      )}
    </section>
  );
}
