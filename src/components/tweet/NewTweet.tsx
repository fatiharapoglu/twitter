import { useState } from "react";
import { TextField, Avatar } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegImage, FaRegSmile } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";

import CircularLoading from "../layout/CircularLoading";
import { createTweet } from "@/utilities/fetch";
import { NewTweetProps } from "@/types/TweetProps";
import { uploadFile } from "@/utilities/storage";

export default function NewTweet({ token, handleSubmit }: NewTweetProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [image, setImage] = useState<string | Blob | null>(null);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"] });
        },
    });

    const validationSchema = yup.object({
        text: yup.string().max(280, "Tweet should be of maximum 280 characters length.").required("Tweet is required."),
    });

    const formik = useFormik({
        initialValues: {
            text: "",
            authorId: token.id,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            mutation.mutate(JSON.stringify(values));
            resetForm();
            if (handleSubmit) handleSubmit();
        },
    });

    const handleImageUpload = async (e: any) => {
        e.preventDefault();
        if (!image) throw new Error("No image selected.");
        const formData = new FormData();
        formData.append("image", image);
        const path: string | void = await uploadFile(formData);
        if (!path) throw new Error("Error uploading image.");
        const url = `https://nifemmkaxhltrtqltltq.supabase.co/storage/v1/object/public/media/${path}`;
        setImageUrl(url);
    };

    const handleImageChange = (e: any) => {
        setImage(e.target.files[0]);
    };

    if (mutation.isLoading) {
        return <CircularLoading />;
    }

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
                    <FaRegImage onClick={() => {}} />
                    <FaRegSmile onClick={() => setShowPicker(!showPicker)} />
                    <button className="btn" type="submit">
                        Tweet
                    </button>
                </div>
                {imageUrl !== "" && (
                    <div className="image">
                        <Image src={imageUrl} alt="" fill />
                    </div>
                )}
                {showPicker && (
                    <div className="emoji-picker">
                        <Picker
                            data={data}
                            onEmojiSelect={(emoji: any) => {
                                formik.setFieldValue("text", formik.values.text + emoji.native);
                                setShowPicker(false);
                            }}
                            onClickOutside={() => setShowPicker(false)}
                            previewPosition="none"
                        />
                    </div>
                )}
            </form>

            <form onSubmit={handleImageUpload}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
