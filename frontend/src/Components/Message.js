import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, text, loginErrorReset }) => {
  return (
    <Alert className="message" onClick={loginErrorReset} variant={variant}>
      {text}
    </Alert>
  );
};

export default Message;
