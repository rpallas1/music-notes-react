import React from "react";
import { useLocation } from "react-router";
import BackLink from "../../components/BackLink";
import CancelLink from "../../components/CancelLink";
import CloseModalLink from "../../components/CloseModalLink";
import { InfoCircle, XCircleFill } from "../../icons";

export default function SubmitRequest() {
  const [titleLength, setTitleLength] = React.useState(0);
  const [summaryLength, setSummaryLength] = React.useState(0);
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const maxTitleLength = 45;
  const maxSummaryLength = 120;
  const location = useLocation();

  function updateTitleLengt(e) {
    setTitleLength(e.target.value.length);
  }

  function updateSummaryLength(e) {
    setSummaryLength(e.target.value.length);
  }

  function toggleInfoModal() {
    setIsInfoModalOpen((prev) => !prev);
  }

  return (
    <div className="submit-request-page">
      <div className="submit-request-content-container">
        <div className="form-nav">
          <BackLink prevLocation={location.state?.prevLocation} />
          <CloseModalLink prevLocation={location.state?.prevLocation} />
          <CancelLink prevLocation={location.state?.prevLocation} />
        </div>
        <h2>
          Submit a Feature{" "}
          <span className="no-wrap">
            Request
            <span className="info-btn-container">
              <button
                className={`info-btn ${isInfoModalOpen ? "dimmed" : ""}`}
                aria-label="More information"
                onClick={toggleInfoModal}
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
        <dl className={`info ${isInfoModalOpen ? "" : "hidden"}`}>
          <button
            className="close-modal close-btn"
            aria-label="Close info modal"
            onClick={toggleInfoModal}
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
          <label htmlFor="title" className="required">
            Title<span>*</span>
          </label>
          <input
            type="text"
            id="title"
            maxLength={45}
            onChange={updateTitleLengt}
          />
          <p className="char-limit">{`${titleLength}/${maxTitleLength}`}</p>
          <p className="error-message hidden">Please enter a title</p>
        </div>
        <div>
          <label htmlFor="summary">Summary</label>
          <textarea
            name="summary"
            id="summary"
            maxLength={120}
            onChange={updateSummaryLength}
          ></textarea>
          <p className="char-limit">{`${summaryLength}/${maxSummaryLength}`}</p>
        </div>
        <div>
          <label htmlFor="message" className="required">
            Message<span>*</span>
          </label>
          <textarea id="message" className="error-input"></textarea>
          <p className="error-message">Please enter a message</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <p className="error-message hidden">Please enter a valid email</p>
        </div>
        <input type="submit" value="Submit" className="link-btn" />
      </form>
    </div>
  );
}
