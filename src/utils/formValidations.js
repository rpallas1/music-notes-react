import startsWithVowel from "./startsWithVowel";

/**
 * Returns an object with text input validations
 *
 * @param {string} id - The id of the input
 * @param {string} label - The label of the input
 * @param {number} maxLength - The maximum length of the input default is 50
 * @param {boolean} required - Whether the input is required default is false
 * @returns {object} An object with text input validations
 */
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

/**
 * Returns an object with email input validations
 *
 * @param {boolean} required - Whether the input is required default is false
 * @returns {object} An object with email input validations
 */
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

/**
 * Returns an object with textarea input validations
 *
 * @param {string} id - The id of the input
 * @param {string} label - The label of the input
 * @param {number} maxLength - The maximum length of the input
 * @param {boolean} required - Whether the input is required default is false
 * @returns {object} An object with textarea input validations
 */
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
