import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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

function CreateEvent() {
  const formik = useFormik({
    initialValues: {
      eventName: "",
      date: "",
      time: "",
      location: "",
      description: "",
      startTime: "",
      endTime: "",
      createdBy: "",
      createdOn: "",
      updatedBy: "",
    },
    validationSchema: Yup.object({
      eventName: Yup.string().required("Required"),
      date: Yup.string().required("Required"),
      time: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
      createdBy: Yup.string().required("Required"),
      createdOn: Yup.string().required("Required"),
      updatedBy: Yup.string().required("Required"),
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
          console.log("Event created successfully");
        } else {
          console.log("Event creation failed");
        }
      });
    },
  });

  return (
    <div>
      <NavBar />
      <div className="bg-white py-10">
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom className="text-center" mt={4}>
          Create Your Event
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 4,
            }}
          >
            <FormLabel htmlFor="eventName">Event Name</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="eventName"
              name="eventName"
              type="text"
              {...formik.getFieldProps("eventName")}
              error={
                formik.touched.eventName && Boolean(formik.errors.eventName)
              }
              helperText={formik.touched.eventName && formik.errors.eventName}
            />

            <FormLabel htmlFor="date">Date</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="date"
              name="date"
              type="date"
              {...formik.getFieldProps("date")}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormLabel htmlFor="time">Time</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="time"
              name="time"
              type="time"
              {...formik.getFieldProps("time")}
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={formik.touched.time && formik.errors.time}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormLabel htmlFor="location">Location</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="location"
              name="location"
              type="text"
              {...formik.getFieldProps("location")}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <FormLabel htmlFor="description">Description</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="description"
              name="description"
              type="text"
              multiline
              rows={4}
              {...formik.getFieldProps("description")}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <FormLabel htmlFor="startTime">Start Time</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="startTime"
              name="startTime"
              type="time"
              {...formik.getFieldProps("startTime")}
              error={
                formik.touched.startTime && Boolean(formik.errors.startTime)
              }
              helperText={formik.touched.startTime && formik.errors.startTime}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormLabel htmlFor="endTime">End Time</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="endTime"
              name="endTime"
              type="time"
              {...formik.getFieldProps("endTime")}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormLabel htmlFor="createdBy">Created By</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="createdBy"
              name="createdBy"
              type="text"
              {...formik.getFieldProps("createdBy")}
              error={
                formik.touched.createdBy && Boolean(formik.errors.createdBy)
              }
              helperText={formik.touched.createdBy && formik.errors.createdBy}
            />

            <FormLabel htmlFor="createdOn">Created On</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="createdOn"
              name="createdOn"
              type="date"
              {...formik.getFieldProps("createdOn")}
              error={
                formik.touched.createdOn && Boolean(formik.errors.createdOn)
              }
              helperText={formik.touched.createdOn && formik.errors.createdOn}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormLabel htmlFor="updatedBy">Updated By</FormLabel>
            <TextField
              fullWidth
              margin="normal"
              id="updatedBy"
              name="updatedBy"
              type="text"
              {...formik.getFieldProps("updatedBy")}
              error={
                formik.touched.updatedBy && Boolean(formik.errors.updatedBy)
              }
              helperText={formik.touched.updatedBy && formik.errors.updatedBy}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Event
            </Button>
          </Box>
        </form>
      </Container>
      </div>
      <Footer />
    </div>
  );
}

export default CreateEvent;
