import React from "react";
import { useLocation } from "react-router";
import BackLink from "../../components/BackLink";
import CancelLink from "../../components/CancelLink";
import CloseModalLink from "../../components/CloseModalLink";
import { InfoCircle, XCircleFill } from "../../icons";
import useOverlay from "../../hooks/useOverlay";

export default function SubmitRequest() {
  const [titleLength, setTitleLength] = React.useState(0);
  const [summaryLength, setSummaryLength] = React.useState(0);
  const [descriptionLength, setDescriptionLength] = React.useState(0);
  const maxTitleLength = 45;
  const maxSummaryLength = 120;
  const maxDescriptionLength = 2000;
  const location = useLocation();
  const {
    ref,
    isOpen: showInfo,
    handleToggle: toggleInfoVisibility,
  } = useOverlay();

  function updateTitleLengt(e) {
    setTitleLength(e.target.value.length);
  }

  function updateSummaryLength(e) {
    setSummaryLength(e.target.value.length);
  }

  function updateDescriptionLength(e) {
    setDescriptionLength(e.target.value.length);
  }

  return (
    <section className="submit-request-page">
      <div className="form-nav">
        <BackLink prevLocation={location.state?.prevLocation} />
        <CloseModalLink prevLocation={location.state?.prevLocation} />
        <CancelLink prevLocation={location.state?.prevLocation} />
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
          <div className="overlay" onClick={toggleInfoVisibility}></div>
        )}
        <dl className={`info ${showInfo ? "" : "hidden"}`} ref={ref}>
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
              Use this section to go as in depth as you would like to provide
              details about your idea and how or why it should by implemented.
            </dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              Optionally enter your email to be notified as the status or your
              submission is updated or if you need to be contacted for more
              details about your idea.
            </dd>
          </div>
        </dl>
      </div>
      <form action="POST" id="submit-request-form" className="form">
        <div>
          <div>
            <label htmlFor="title" className="required">
              Title<span>*</span>
            </label>
            <input
              type="text"
              id="title"
              maxLength={maxTitleLength}
              onChange={updateTitleLengt}
            />
            <p className="char-limit">{`${titleLength}/${maxTitleLength}`}</p>
          </div>
          <p className="error-message hidden">Please enter a title</p>
        </div>
        <div>
          <label htmlFor="summary" className="textarea-label">
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            maxLength={maxSummaryLength}
            onChange={updateSummaryLength}
          ></textarea>
          <p className="char-limit">{`${summaryLength}/${maxSummaryLength}`}</p>
        </div>
        <div>
          <div>
            <label htmlFor="message" className="required textarea-label">
              Description<span>*</span>
            </label>
            <textarea
              id="message"
              // className="error-input"
              maxLength={maxDescriptionLength}
              onChange={updateDescriptionLength}
            ></textarea>
            {/* <p className="char-limit">{`${descriptionLength}/${maxDescriptionLength}`}</p> */}
          </div>
          <p className="error-message hidden">Please enter a message</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <p className="error-message hidden">Please enter a valid email</p>
        </div>
        <input type="submit" value="Submit" className="link-btn" />
      </form>
    </section>
  );
}
