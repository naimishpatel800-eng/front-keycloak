import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

interface ForgotPasswordForm {
  email: string;
  newPassword: string;
}

const ForgotPassword: React.FC = () => {
  const toast = useRef<Toast>(null);

  const formik = useFormik<ForgotPasswordForm>({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/forgot-password",
          { email: values.email.trim(), password: values.newPassword.trim() },
          { validateStatus: () => true }
        );

        toast.current?.show({
          severity: "success",
          summary: "Info",
          detail: response.data,
          life: 4000,
        });

        formik.resetForm();
      } catch (error: any) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error.message || "Password reset failed",
          life: 4000,
        });
      }
    },
  });

  return (
    <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
      <Toast ref={toast} />
      <Card title="Reset Password" style={{ width: "450px", borderRadius: "12px" }}>
        <form onSubmit={formik.handleSubmit} className="p-fluid">

          <div className="field mt-2">
            <InputText
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              className={formik.touched.email && formik.errors.email ? "p-invalid" : ""}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="p-error">{formik.errors.email}</small>
            )}
          </div>

          <div className="field mt-3">
            <Password
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              toggleMask
              feedback={false}
              placeholder="Enter new password"
              className={formik.touched.newPassword && formik.errors.newPassword ? "p-invalid" : ""}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="p-error">{formik.errors.newPassword}</small>
            )}
          </div>

          <Button
            type="submit"
            label="Reset Password"
            className="mt-4 p-button-success w-full"
          />

          <div className="mt-3 text-center">
            <span>Remember your password? </span>
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              Login Here
            </Link>
          </div>

        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;