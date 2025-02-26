import startsWithVowel from "./startsWithVowel";

function textValidations(id, label, maxLength = 50, required = false) {
  return {
    id: id,
    type: "text",
    label: label,
    validation: {
      required: {
        value: required,
        message: `Please enter ${startsWithVowel(label) ? "an" : "a"} ${label.toLowerCase()}`,
      },
      maxLength: {
        value: maxLength,
        message: `${label} cannot exceed ${maxLength} characters`,
      },
    },
  };
}

function emailValidations(required = false) {
  return {
    id: "email",
    type: "email",
    label: "Email",
    placeholder: "johndoe@email.com",
    validation: {
      required: {
        value: required,
        message: "Please enter an email",
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Please enter a valid email",
      },
    },
  };
}

function textAreaValidations(id, label, maxLength, required = false) {
  return {
    id: id,
    type: "textarea",
    label: label,
    validation: {
      required: {
        value: required,
        message: `Please enter ${startsWithVowel(label) ? "an" : "a"} ${label.toLowerCase()}`,
      },
      maxLength: {
        value: maxLength,
        message: `${label} cannot exceed ${maxLength} characters`,
      },
    },
  };
}

export { textValidations, emailValidations, textAreaValidations };
