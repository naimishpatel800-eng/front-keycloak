  import React, { useRef, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import axios from "axios";

  import { InputText } from "primereact/inputtext";
  import { Password } from "primereact/password";
  import { Button } from "primereact/button";
  import { Card } from "primereact/card";
  import { Toast } from "primereact/toast";
  import { Calendar } from "primereact/calendar";
  import { InputSwitch } from "primereact/inputswitch";
  import { RadioButton } from "primereact/radiobutton";
  import { Dialog } from "primereact/dialog";

  interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    contact: string;
    gender: string;
    dob: Date | null;
    acceptTerms: boolean;
  }

  const Registration: React.FC = () => {
    const toast = useRef<Toast>(null);
    const [showTerms, setShowTerms] = useState(false);

    const formik = useFormik<RegisterForm>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        gender: "",
        dob: null,
        acceptTerms: false,
      },
  
      validationSchema: Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().min(6).required("Password required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm password required"),
        contact: Yup.string()
          .matches(/^[0-9]{10}$/, "Enter valid contact number")
          .required("Contact required"),
        gender: Yup.string().required("Select gender"),
        dob: Yup.date().required("Date of birth required"),
        acceptTerms: Yup.boolean().oneOf(
          [true],
          "You must accept Terms & Conditions"
        ),
      }),

      onSubmit: async (values) => {     
        const payload = {
          ...values,
          dateOfBirth: values.dob
            ? values.dob.toISOString().split("T")[0]
            : null,
        };

        try {
          await axios.post("http://localhost:8080/api/register", payload);

          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Registration Successful",
            life: 3000,
          });

          formik.resetForm();
        } catch (error) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Registration Failed",
            life: 3000,
          });
        }
      },
    });

    return (
      <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
        <Toast ref={toast} />

        <Card title="User Registration" style={{ width: "650px", borderRadius: "12px" }}>
          <form onSubmit={formik.handleSubmit}   data-testid="registration-form" className="p-fluid">
            <div className="grid">
              <div className="col-6">
                <InputText
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="First Name"
                />
                <small className="p-error">{formik.errors.firstName}</small>
              </div>
              <div className="col-6">
                <InputText
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder="Last Name"
                />
                <small className="p-error">{formik.errors.lastName}</small>
              </div>
            </div>

            <div className="field mt-3">
              <InputText
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email Address"
              />
              <small className="p-error">{formik.errors.email}</small>
            </div>

            <div className="grid mt-3">
              <div className="col-6">
                <Password
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  placeholder="Password"
                />
                <small className="p-error">{formik.errors.password}</small>
              </div>
              <div className="col-6">
                <Password
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  toggleMask
                  placeholder="Confirm Password"
                  feedback={false}
                />
                <small className="p-error">{formik.errors.confirmPassword}</small>
              </div>
            </div>

            <div className="field mt-3">
              <InputText
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                placeholder="Contact Number"
              />
              <small className="p-error">{formik.errors.contact}</small>
            </div>

            <div className="field mt-3">
              <Calendar
                data-testid="dob-input"
                value={formik.values.dob}
                onChange={(e) => formik.setFieldValue("dob", e.value)}
                placeholder="Date of Birth"
                showIcon
                dateFormat="dd/mm/yy"
              />
              <small className="p-error">{formik.errors.dob}</small>
            </div>

            <div className="field mt-3">
              <label className="mr-3">Gender :</label>

              <RadioButton
                inputId="male"
                name="gender"
                value="Male"
                onChange={(e) => formik.setFieldValue("gender", e.value)}
                checked={formik.values.gender === "Male"}
              />
              <label  htmlFor="male" className="ml-1 mr-2" style={{textAlign:"center"}}>Male</label>

              <RadioButton
                inputId="female"
                name="gender"
                value="Female"
                onChange={(e) => formik.setFieldValue("gender", e.value)}
                checked={formik.values.gender === "Female"}
              />
              <label className="ml-2 mr-4">Female</label>

              <RadioButton
                inputId="other"
                name="gender"
                value="Other"
                onChange={(e) => formik.setFieldValue("gender", e.value)}
                checked={formik.values.gender === "Other"}
              />
              <label className="ml-2">Other</label>

              <br />
              <small className="p-error">{formik.errors.gender}</small>
            </div>

            <div className="field mt-3 flex align-items-center">
              <InputSwitch
              data-testid="accept-terms-switch"
                checked={formik.values.acceptTerms}
                onChange={(e) => formik.setFieldValue("acceptTerms", e.value)}
              />
              <label className="ml-3">
                I accept{" "}
                <span
                  style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setShowTerms(true)}
                >
                  Terms & Conditions
                </span>
              </label>
            </div>
            {formik.errors.acceptTerms && (
              <small className="p-error">{formik.errors.acceptTerms}</small>
            )}

            <Button
              type="submit"
              label="Register"
              className="mt-4 p-button-success w-full"
            />
          </form>
        </Card>

        <Dialog
          header="Terms & Conditions"
          visible={showTerms}
          style={{ width: "50vw" }}
          onHide={() => setShowTerms(false)}
        >
          <p>
            Welcome to our platform! By registering, you agree to abide by our rules and privacy policy.
            You must not misuse the service, share your credentials, or perform any illegal activity.
          </p>
          <p>
            All user data will be handled securely and confidentially. 
            For full details, please read our privacy policy.
          </p>
        </Dialog>
      </div>
    );
  };

  export default Registration;	