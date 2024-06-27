import React from "react";
import { Formik, Form, Field, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "./apicalls/url";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group mb-3">
      <label htmlFor={props.id || props.name}>{label}</label>
      <Field
        {...field}
        {...props}
        className={`form-control ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupComponent = () => {
  const navigate = useNavigate();

  const initialValues = {
    u_id: "",
    u_name: "",
    u_pwd: "",
    confirmPassword: "",
    u_u_email: "",
    u_addr: "",
    u_contact: "",
  };

  const validationSchema = Yup.object().shape({
    u_id: Yup.string().required("User ID is required"),
    u_name: Yup.string().required("User Name is required"),
    u_pwd: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("u_pwd"), null], "Passwords must match"),
    u_u_email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    u_addr: Yup.string().required("Address is required"),
    u_contact: Yup.string().required("Contact is required"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios.post(url + "/insertuser", values).then(
      (posRes) => {
        console.log(posRes.data);
        alert("Signup Successful!");
        setStatus({ success: true });
        navigate("/login");
      },
      (errRes) => {
        console.log(errRes);
        alert("Signup Failed!");
        setStatus({ success: false });
      }
    );
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="border p-4 shadow rounded">
            <h3 className="text-primary mb-4">Signup User</h3>
            <TextField
              label="User ID"
              name="u_id"
              type="text"
              placeholder="Enter User ID"
            />
            <TextField
              label="User Name"
              name="u_name"
              type="text"
              placeholder="Enter User Name"
            />
            <TextField
              label="Password"
              name="u_pwd"
              type="password"
              placeholder="Enter Password"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <TextField
              label="User Email"
              name="u_u_email"
              type="email"
              placeholder="Enter User Email"
            />
            <TextField
              label="User Address"
              name="u_addr"
              type="text"
              placeholder="Enter User Address"
            />
            <TextField
              label="Contact"
              name="u_contact"
              type="text"
              placeholder="Enter Contact"
            />

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-success w-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Signup"}
              </button>
            </div>
            {status && status.success === false && (
              <div className="alert alert-danger mt-3">Signup Failed!</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupComponent;
