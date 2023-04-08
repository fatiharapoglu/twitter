"use client";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as yup from "yup";

import { createTweet } from "../fetch";

export default function NewTweet() {
    const validationSchema = yup.object({
        text: yup
            .string()
            .max(280, "Tweet should be of maximum 280 characters length.")
            .required("Tweet is required."),
    });

    const formik = useFormik({
        initialValues: {
            text: "",
            author: {
                connect: {
                    id: "10043ee5-7548-4cf0-8724-f7c55cd953d9",
                },
            },
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const json = await createTweet(JSON.stringify(values));
            if (!json.success) {
                console.log(json);
                alert("something went wrong");
                // snackbar here
            }
            // redirect to home
            console.log("Tweeted successfully");
        },
    });

    return (
        <div className="new-tweet-form">
            <Avatar alt="" src="https://picsum.photos/200/300" />
            <form onSubmit={formik.handleSubmit}>
                <div className="input">
                    <TextField
                        label="Tweet"
                        placeholder="What's happening?"
                        multiline
                        maxRows={4}
                        variant="standard"
                        fullWidth
                        name="text"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                    />
                </div>
                <button className="btn" type="submit">
                    Tweet
                </button>
            </form>
        </div>
    );
}
