import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import classNames from "classnames";
import InputError from "./InputError";
import findInputError from "../utils/findInputError";
import isFormInvalid from "../utils/isFormInvalid";
import useFormType from "../hooks/useFormType";

/**
 * The Input component renders an input or textarea element.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The input label.
 * @param {string} props.type - The input type.
 * @param {string} props.id - The input id.
 * @param {string} props.placeholder - The input placeholder.
 * @param {object} props.validation - The input validation rules.
 * @param {boolean} props.trackLength - Whether to track the length of the input value. Defaults to false.
 */
export default function Input({
  label,
  type,
  id,
  placeholder,
  validation,
  trackLength = false,
}) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const formType = useFormType();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);
  const inputLabelContainerClass = classNames(
    "input-label-container",
    validation.required.value && "required",
    isInvalid && "error-input",
  );
  const savedFormData =
    JSON.parse(localStorage.getItem(`${formType}-form-data`)) || {};
  const [firstRender, setFirstRender] = React.useState(true);

  // Set the form data value to the saved value on the first render
  React.useEffect(() => {
    setValue(id, savedFormData[id] || "");

    if (firstRender) {
      setFirstRender(false);
    }
  }, []);

  const savedValue = savedFormData[id] || "";
  const currentLength = useWatch({ name: id })?.trim().length || 0;

  localStorage.setItem(
    `${formType}-form-data`,
    JSON.stringify({
      ...savedFormData,
      [id]: getValues(id) || (firstRender ? savedValue : ""),
    }),
  );

  /**
   * Render the input element based on the input type.
   *
   * @returns {object} The input element
   */
  const input = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          className="custom-scroll-bar"
          maxLength={trackLength ? validation.maxLength?.value : null}
          placeholder={placeholder}
          {...register(id, {
            ...validation,
            value: savedValue,
          })}
        />
      );
    }

    return (
      <input
        type={type}
        id={id}
        maxLength={trackLength ? validation.maxLength?.value : null}
        placeholder={placeholder}
        {...register(id, {
          ...validation,
          value: savedValue,
        })}
      />
    );
  };

  return (
    <div className="input-container">
      <div className={inputLabelContainerClass}>
        {input()}
        <label htmlFor={id}>
          {label}
          {validation.required?.value && <span>*</span>}
        </label>
        {trackLength && (
          <p className="char-limit">{`${currentLength}/${validation.maxLength?.value}`}</p>
        )}
      </div>
      {isInvalid && (
        <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        />
      )}
    </div>
  );
}
