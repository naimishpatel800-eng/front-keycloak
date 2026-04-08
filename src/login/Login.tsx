// // import React, { useRef } from "react";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import axios from "axios";

// // import { InputText } from "primereact/inputtext";
// // import { Password } from "primereact/password";
// // import { Button } from "primereact/button";
// // import { Card } from "primereact/card";
// // import { Toast } from "primereact/toast";
// // import { Link, useNavigate } from "react-router-dom";

// // interface LoginForm {
// //   email: string;
// //   password: string;
// // }

// // const Login: React.FC = () => {
// //   const toast = useRef<Toast>(null);
  
// //   const navigate = useNavigate();

// //   const formik = useFormik<LoginForm>({
// //     initialValues: {
// //       email: "",
// //       password: "",
// //     },
// //     validationSchema: Yup.object({
// //       email: Yup.string().email("Invalid email").required("Email is required"),
// //       password: Yup.string().required("Password is required"),
// //     }),
// //     onSubmit: async (values) => {
// //       try {
// //         const payload = {
// //           email: values.email.trim(),
// //           password: values.password.trim(),
// //         };

// //         const response = await axios.post(
// //           "http://localhost:8080/api/login",
// //           payload,
// //           { validateStatus: () => true }
// //         );

// //         const data = response.data;

// //         if (data && data.id) {
// //           toast.current?.show({
// //             severity: "success",
// //             summary: "Success",
// //             detail: "Login Successful",
// //             life: 3000,
// //           });
// //           formik.resetForm();
// //           navigate("/dashboard");
// //         } else if (typeof data === "string") {
// //           toast.current?.show({
// //             severity: "error",
// //             summary: "Error",
// //             detail: data,
// //             life: 3000,
// //           });
// //         } else {
// //           toast.current?.show({
// //             severity: "error",
// //             summary: "Error",
// //             detail: "Login failed. Please try again.",
// //             life: 3000,
// //           });
// //         }
// //       } catch (error: any) {
// //         toast.current?.show({
// //           severity: "error",
// //           summary: "Error",
// //           detail: error.message || "Login Failed",
// //           life: 3000,
// //         });
// //       }
// //     },
// //   });

// //   return (
// //     <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
// //       <Toast ref={toast} />

// //       <Card title="Login" style={{ width: "450px", borderRadius: "12px" }}>
// //         <form onSubmit={formik.handleSubmit} className="p-fluid">

// //           <div className="field mt-2">
// //             <InputText
// //               name="email"
// //               value={formik.values.email}
// //               onChange={formik.handleChange}
// //               onBlur={formik.handleBlur}
// //               placeholder="Enter your email"
// //               className={formik.touched.email && formik.errors.email ? "p-invalid" : ""}
// //             />
// //             {formik.touched.email && formik.errors.email && (
// //               <small className="p-error">{formik.errors.email}</small>
// //             )}
// //           </div>

// //           <div className="field mt-3">
// //             <Password
// //               name="password"
// //               value={formik.values.password}
// //               onChange={formik.handleChange}
// //               onBlur={formik.handleBlur}
// //               toggleMask
// //               feedback={false}
// //               placeholder="Enter your password"
// //               className={formik.touched.password && formik.errors.password ? "p-invalid" : ""}
// //             />
// //             {formik.touched.password && formik.errors.password && (
// //               <small className="p-error">{formik.errors.password}</small>
// //             )}
// //           </div>

// //           <Button
// //             type="submit"
// //             label="Login"
// //             className="mt-4 p-button-success w-full"
// //           />

// //           <div className="mt-3 text-center">
// //             <Link to="/forgot-password" className="text-blue-600 hover:underline">
// //               Forgot Password?
// //             </Link>
// //           </div>


// //         </form>
// //       </Card>
      
// //     </div>
    
// //   );
// // };

// // export default Login;


// import React, { useRef, useState } from "react";
// import { Button } from "primereact/button";
// import { Card } from "primereact/card";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
// import { useNavigate } from "react-router-dom";
// import { loginWithPassword } from "../KeycloakService"; // Assuming this is the correct import path

// interface LoginProps {
//   setAuthenticated: (val: boolean) => void;
// }

// const Login: React.FC<LoginProps> = ({ setAuthenticated }) => {
//   const toast = useRef<Toast>(null);
//   const navigate = useNavigate();
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Ensure that username and password are provided
//     if (!username || !password) {
//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Both username and password are required",
//         life: 3000,
//       });
//       return;
//     }

//     // Call the login function
//     const token = await loginWithPassword(username, password);

//     if (token) {
//       toast.current?.show({
//         severity: "success",
//         summary: "Success",
//         detail: "Login Successful",
//         life: 3000,
//       });
//       setAuthenticated(true);
//       navigate("/dashboard"); // Redirect to the dashboard after successful login
//     } else {
//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Login Failed",
//         life: 3000,
//       });
//     }
//   };

//   return (
//     <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
//       <Toast ref={toast} />
//       <Card title="Login" style={{ width: "400px", borderRadius: "12px" }}>
//         <form onSubmit={handleSubmit} className="p-fluid">
//           <div className="field mt-2">
//             <InputText
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Username"
//               className={!username ? "p-invalid" : ""}
//             />
//           </div>

//           <div className="field mt-3">
//             <Password
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               toggleMask
//               feedback={false}
//               placeholder="Password"
//               className={!password ? "p-invalid" : ""}
//             />
//           </div>

//           <Button type="submit" label="Login" className="mt-4 w-full p-button-success" />
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default Login;