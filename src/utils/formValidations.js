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
      validate: {
        trim: (value) => {
          if (value.trim().length === 0 && required) {
            return `${label} cannot be empty`;
          }
        },
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
      maxLength: {
        value: 100,
        message: "Email cannot exceed 100 characters",
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
      validate: {
        trim: (value) => {
          if (value.trim().length === 0 && required) {
            return `${label} cannot be empty`;
          }
        },
      },
    },
  };
}

export { textValidations, emailValidations, textAreaValidations };
