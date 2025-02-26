import React from "react";
import { useLocation } from "react-router";
import { useFormContext, useWatch } from "react-hook-form";
import classNames from "classnames";
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
    getValues,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, id);
  const isInvalid = isFormInvalid(inputError);
  const inputLabelContainerClass = classNames(
    "input-label-container",
    validation.required.value && "required",
    isInvalid && "error-input",
  );
  const formType = useLocation().pathname.split("/").pop();
  const savedFormData =
    JSON.parse(localStorage.getItem(`${formType}-form-data`)) || {};
  const savedValue = savedFormData[id] || "";
  const currentLength = useWatch({ name: id })?.length || savedValue.length;

  localStorage.setItem(
    `${formType}-form-data`,
    JSON.stringify({
      ...savedFormData,
      [id]: getValues(id) || savedValue,
    }),
  );

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
