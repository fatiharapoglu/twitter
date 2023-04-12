"use client";

import { TextField, Avatar } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegImage, FaRegSmile } from "react-icons/fa";

import { createTweet } from "@/utilities/fetch";
import { AuthorProps } from "@/types/AuthorProps";

export default function NewTweet({ token }: { token: AuthorProps }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

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
                    id: token.id,
                },
            },
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            mutation.mutate(JSON.stringify(values));
        },
    });

    return (
        <div className="new-tweet-form">
            <Avatar sx={{ width: 50, height: 50 }} alt="" src="https://picsum.photos/200/300" />
            <form onSubmit={formik.handleSubmit}>
                <div className="input">
                    <TextField
                        label="What's happening?"
                        placeholder="What's happening?"
                        multiline
                        rows={4}
                        variant="standard"
                        fullWidth
                        name="text"
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                    />
                </div>
                <div className="input-additions">
                    <FaRegImage />
                    <FaRegSmile />
                    <button className="btn" type="submit">
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    );
}
