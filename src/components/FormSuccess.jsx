import React from "react";
import { XCircleFill } from "../icons";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

export default function FormSuccess({ formData, type, closeForm }) {
  const header =
    type === "contact"
      ? "Thank you for reaching out!"
      : "Thank you for your feedback!";

  const message = () => {
    if (type === "contact") {
      return "We will get back to you as soon as possible.";
    }

    if (formData.email) {
      return (
        <>
          We will review your feature request and get back to you at{" "}
          <span className="submitted-email">{formData.email}</span> if we have
          any questions.
        </>
      );
    }

    return "Your feature request will be reviewed and published if approved. Keep an eye out for your feature request on our site!";
  };

  const dataEls = Object.entries(formData).map(([key, value]) => {
    if (value) {
      return (
        <div key={key}>
          <dt>{capitalizeFirstLetter(key)}</dt>
          <dd className="custom-scroll-bar">{value}</dd>
        </div>
      );
    }
  });

  return (
    <section className="form-success overlay-content custom-scroll-bar">
      <h3>{header}</h3>
      <p>{message()}</p>
      <dl>{dataEls}</dl>
      <button
        className="close-modal close-btn"
        aria-label="Close successful form submission modal"
        onClick={closeForm}
      >
        <XCircleFill />
      </button>
    </section>
  );
}
