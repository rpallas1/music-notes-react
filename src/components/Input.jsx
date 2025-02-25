import React from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import InputError from "./InputError";
import findInputError from "../utils/findInputError";
import isFormInvalid from "../utils/isFormInvalid";

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
    formState: { errors },
  } = useFormContext();
  const [currentLength, setCurrentLength] = React.useState(0);

  const inputError = findInputError(errors, label);
  const isInvalid = isFormInvalid(inputError);
  const inputLabelContainerClass = classNames(
    "input-label-container",
    validation.required.value && "required",
    isInvalid && "error-input",
  );

  function updateCurrentLength(e) {
    setCurrentLength(e.target.value.length);
  }

  const input = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          className="custom-scroll-bar"
          maxLength={validation.maxLength?.value}
          placeholder={placeholder}
          {...register(label, {
            ...validation,
            onChange: trackLength ? (e) => updateCurrentLength(e) : null,
          })}
        />
      );
    }

    return (
      <input
        type={type}
        id={id}
        maxLength={validation.maxLength?.value}
        placeholder={placeholder}
        {...register(label, {
          ...validation,
          onChange: trackLength ? (e) => updateCurrentLength(e) : null,
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
