import React from "react";

const getErrorMessage = ({
  type,
  inputLength,
}: {
  type: string;
  inputLength?: number;
}) => {
  if (type === "required") return "This field is required";
  else if (type === "minLength")
    return `Min length is ${inputLength === undefined ? "8" : inputLength}`;
  else if (type === "notMatched") return "Password doesnt match";
  else if (type === "wrongPasswordOrUname")
    return "Password or username incorrect";
  else if (type === "unameTaken") return "Username already taken";
  else if (type === "whitespace") return "No White Space Allowed";
};

const InputErrorIndicator = ({
  type,
  inputLength,
}: {
  type: string;
  inputLength?: number;
}) => {
  return (
    <span className="text-sm raleway text-red-600 font-medium">
      {getErrorMessage({ type: type, inputLength: inputLength })}
    </span>
  );
};

export default InputErrorIndicator;
