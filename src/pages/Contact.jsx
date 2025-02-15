import React from "react";

export default function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        Have questions, comments, or concerns? Feel free to reach out and
        we&apos;ll try to respond in 1-2 business days.
      </p>
      <form action="POST" id="contact-form" className="form">
        <div>
          <label htmlFor="name" className="required">
            Name<span>*</span>
          </label>
          <input type="text" id="name" />
          <p className="error-message hidden">Please enter a name</p>
        </div>
        <div>
          <label htmlFor="email" className="required">
            Email<span>*</span>
          </label>
          <input type="email" id="email" />
          <p className="error-message hidden">Please enter a valid email</p>
        </div>
        <div>
          <label htmlFor="message" className="required">
            Message<span>*</span>
          </label>
          <textarea id="message" className="error-input"></textarea>
          <p className="error-message">Please enter a message</p>
        </div>
        <input type="submit" value="Submit" className="link-btn" />
      </form>
    </div>
  );
}
