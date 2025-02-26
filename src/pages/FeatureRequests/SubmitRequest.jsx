import React from "react";
import { useLocation } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import BackLink from "../../components/BackLink";
import CancelLink from "../../components/CancelLink";
import CloseModalLink from "../../components/CloseModalLink";
import FormSuccess from "../../components/FormSuccess";
import { InfoCircle, XCircleFill } from "../../icons";
import useOverlay from "../../hooks/useOverlay";
import {
  textValidations,
  textAreaValidations,
  emailValidations,
} from "../../utils/formValidations";
import Input from "../../components/Input";

export default function SubmitRequest() {
  const location = useLocation();
  const {
    ref,
    isOpen: showInfo,
    handleToggle: toggleInfoVisibility,
  } = useOverlay();

  const { isOpen: showSuccess, handleToggle: toggleSuccessVisibility } =
    useOverlay();

  const methods = useForm();
  const [formData, setFormData] = React.useState(null);
  const formType = location.pathname.split("/").pop();

  const onSubmit = methods.handleSubmit((data) => {
    methods.reset();
    setFormData(data);
    toggleSuccessVisibility();

    localStorage.removeItem(`${formType}-form-data`);

    fetch("/api/feature-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => console.error(err));
  });

  const titleValidation = textValidations("title", "Title", 45, true);
  const summaryValidation = textAreaValidations(
    "summary",
    "Summary",
    120,
    false,
  );
  const descriptionValidation = textAreaValidations(
    "description",
    "Description",
    10000,
    true,
  );
  const emailValidation = emailValidations(false);

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
        <CloseModalLink prevLocation={location.state?.prevLocation} />
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
        {showInfo && (
          <>
            <div className="overlay" onClick={toggleInfoVisibility}></div>
            <dl className="info overlay-content" ref={ref}>
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
                  other to quickly see and to understand your idea.
                </dd>
              </div>
              <div>
                <dt>Description</dt>
                <dd>
                  Use this section to go as in depth as you would like to
                  provide details about your idea and how or why it should by
                  implemented.
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  Optionally enter your email to be notified as the status or
                  your submission is updated or if you need to be contacted for
                  more details about your idea.
                </dd>
              </div>
            </dl>
          </>
        )}
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
          />
        </>
      )}
    </section>
  );
}
