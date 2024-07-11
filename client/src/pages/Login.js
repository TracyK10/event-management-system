import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormLabel,
} from "@mui/material";

function Login() {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      fetch("url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          setError(false);
          setMessage("Login successful");
        } else {
          setError(true);
          setMessage("Login failed");
        }
      });
    },
  });
  return (
    <div className="bg-white p-10 pb-60">
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            type="password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          {error && <div>{message}</div>}
        </form>
      </Box>
    </Container>
  </div>
  );
}

export default Login;
