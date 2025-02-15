import React from "react";
import { useLocation } from "react-router";
import BackLink from "../../components/BackLink";
import CancelLink from "../../components/CancelLink";
import CloseModalLink from "../../components/CloseModalLink";

export default function SubmitRequest() {
  const [titleLength, setTitleLength] = React.useState(0);
  const [summaryLength, setSummaryLength] = React.useState(0);
  const maxTitleLength = 45;
  const maxSummaryLength = 120;
  const location = useLocation();

  function updateTitleLengt(e) {
    setTitleLength(e.target.value.length);
  }

  function updateSummaryLength(e) {
    setSummaryLength(e.target.value.length);
  }

  return (
    <div className="submit-request-page">
      <h2>Submit a Feature Request</h2>
      <p>
        Share whatever ideas, improvements, or features you think Music Notes
        should have.
      </p>
      <div>
        <BackLink prevLocation={location.state?.prevLocation} />
        <CloseModalLink prevLocation={location.state?.prevLocation} />
        <CancelLink prevLocation={location.state?.prevLocation} />
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
