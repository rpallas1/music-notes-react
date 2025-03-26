import React from "react";
import classNames from "classnames";
import { XCircleFill } from "../icons";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

/**
 * The FormSuccess component displays a success message after a form submission.
 *
 * @param {object} props - The component props.
 * @param {object} props.formData - The form data.
 * @param {string} props.type - The form type.
 * @param {function} props.closeForm - The callback function to close the form.
 * @param {boolean} props.success - The success status of the form submission.
 */
export default function FormSuccess({ formData, type, closeForm, success }) {
  const header = () => {
    if (!success) {
      return "Oops! Something went wrong.";
    }

    return type === "contact"
      ? "Thank you for reaching out!"
      : "Thank you for your feedback!";
  };

  const message = () => {
    if (!success) {
      return "Your input could not be submitted at this time. Please try again later.";
    }

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

  const formSuccessClass = classNames(
    "form-success overlay-content custom-scroll-bar",
    {
      error: !success,
    },
  );

  return (
    <section className={formSuccessClass}>
      <h3>{header()}</h3>
      <p>{message()}</p>
      {success && <dl>{dataEls}</dl>}
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
