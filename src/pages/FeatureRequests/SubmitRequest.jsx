import React from "react";
import { useLocation } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import BackLink from "../../components/BackLink";
import CancelLink from "../../components/CancelLink";
import FormSuccess from "../../components/FormSuccess";
import Input from "../../components/Input";
import { InfoCircle, XCircleFill } from "../../icons";
import useOverlay from "../../hooks/useOverlay";
import useFormType from "../../hooks/useFormType";
import {
  textValidations,
  textAreaValidations,
  emailValidations,
} from "../../utils/formValidations";
import { createFeatureRequest } from "../../utils/api";
import log from "../../utils/log";

/**
 * The SubmitRequest component displays the form to submit a feature request.
 *
 * It provides fields for the title, summary, description, and email.
 */
export default function SubmitRequest() {
  const location = useLocation();
  const formType = useFormType();
  const {
    ref,
    isOpen: showInfo,
    handleToggle: toggleInfoVisibility,
  } = useOverlay();
  const { isOpen: showSuccess, handleToggle: toggleSuccessVisibility } =
    useOverlay();
  const methods = useForm();
  const [formData, setFormData] = React.useState(null);
  const [isSuccessfulSubmission, setIsSuccessfulSubmission] =
    React.useState(true);

  /**
   * Submits the form data to the server.
   *
   * If the submission is successful, it resets the form and displays a success message.
   */
  const onSubmit = methods.handleSubmit((data) => {
    createFeatureRequest(data)
      .then(() => {
        methods.reset();
        setIsSuccessfulSubmission(true);
        localStorage.removeItem(`${formType}-form-data`);
      })
      .catch((err) => {
        log.error(err);
        setIsSuccessfulSubmission(false);
      })
      .finally(() => {
        setFormData(data);
        toggleSuccessVisibility();
      });
  });

  const titleValidation = textValidations("title", "Title", 50, true);
  const summaryValidation = textAreaValidations(
    "summary",
    "Summary",
    200,
    false,
  );
  const descriptionValidation = textAreaValidations(
    "description",
    "Description",
    10000,
    true,
  );
  const emailValidation = emailValidations(false);

  /**
   * Clears the saved form data from local storage.
   */
  function clearSavedFormData() {
    localStorage.removeItem(`${formType}-form-data`);
  }

  return (
    <section className="submit-request-page">
      <div className="form-nav">
        <BackLink
          prevLocation={location.state?.prevLocation}
          prevSearchParams={location.state?.prevSearchParams}
        />
        <CancelLink
          prevLocation={location.state?.prevLocation}
          prevSearchParams={location.state?.prevSearchParams}
          onCancel={clearSavedFormData}
        />
      </div>
      <div className="submit-request-content-container">
        <h2>
          Submit a Feature{" "}
          <span className="no-wrap">
            Request
            <span className="info-btn-container">
              <button
                className={`info-btn ${showInfo ? "dimmed" : ""}`}
                aria-label="More information"
                onClick={toggleInfoVisibility}
              >
                {<InfoCircle />}
              </button>
            </span>
          </span>
        </h2>
        <p className="form-description">
          Share whatever ideas, improvements, or features you think Music Notes
          should have.
        </p>
        <div
          className={`${showInfo ? "" : "hidden"}`}
          onClick={toggleInfoVisibility}
        ></div>
        <dl
          className={`info overlay-content ${showInfo ? "" : "hidden"}`}
          ref={ref}
        >
          <button
            className="close-modal close-btn"
            aria-label="Close info modal"
            onClick={toggleInfoVisibility}
          >
            <XCircleFill />
          </button>
          <div>
            <dt>Title</dt>
            <dd>Enter a concise, one line summmary of your idea.</dd>
          </div>
          <div>
            <dt>Summary</dt>
            <dd>
              Optionally add a summary that will show up under the title for
              others to quickly see and understand your idea.
            </dd>
          </div>
          <div>
            <dt>Description</dt>
            <dd>
              Use this section to go as in depth as you would like to provide
              details about your idea and how or why it should by implemented.
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              Optionally enter your email to be notified as the status of your
              submission is updated or if you need to be contacted for more
              details about your idea.
            </dd>
          </div>
        </dl>
      </div>
      <FormProvider {...methods}>
        <form
          action="POST"
          id="submit-request-form"
          className="form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <Input {...titleValidation} trackLength={true} />
          <Input {...summaryValidation} trackLength={true} />
          <Input {...descriptionValidation} />
          <Input {...emailValidation} />
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
            type="submit-request"
            closeForm={toggleSuccessVisibility}
            success={isSuccessfulSubmission}
          />
        </>
      )}
    </section>
  );
}
