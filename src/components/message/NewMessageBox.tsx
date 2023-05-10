import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { FaPaperPlane, FaRegImage, FaRegSmile } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import * as yup from "yup";

import CircularLoading from "../misc/CircularLoading";
import Uploader from "../misc/Uploader";
import { createMessage } from "@/utilities/fetch";
import { uploadFile } from "@/utilities/storage";
import { MessageFormProps } from "@/types/MessageProps";

export default function NewMessageBox({ messagedUsername, token, setFreshMessages, freshMessages }: MessageFormProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [showDropzone, setShowDropzone] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMessage,
        onMutate: () => {
            const newMessage = {
                photoUrl: formik.values.photoUrl,
                text: formik.values.text,
                createdAt: Date.now(),
                sender: {
                    username: formik.values.sender,
                },
                recipient: {
                    username: formik.values.recipient,
                },
                id: Math.floor(Math.random() * 1000000).toString(),
            };
            setFreshMessages([...freshMessages, newMessage]);
            formik.resetForm();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", token.username] });
        },
    });

    const handlePhotoChange = (file: File) => {
        setPhotoFile(file);
    };

    const validationSchema = yup.object({
        text: yup
            .string()
            .max(280, "Message text should be of maximum 280 characters length.")
            .required("Message text can't be empty."),
    });

    const formik = useFormik({
        initialValues: {
            sender: token.username,
            recipient: messagedUsername ? messagedUsername : token.username, // if messagedUsername is null, then the user is messaging themselves
            text: "",
            photoUrl: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (photoFile) {
                const path: string | void = await uploadFile(photoFile);
                if (!path) throw new Error("Error uploading image.");
                values.photoUrl = path;
                setPhotoFile(null);
            }
            mutation.mutate(JSON.stringify(values));
            setShowDropzone(false);
        },
    });

    return (
        <div className="new-message-box">
            <form className="new-message-form" onSubmit={formik.handleSubmit}>
                <div className="input">
                    <TextField
                        placeholder="Start a new message"
                        multiline
                        hiddenLabel
                        variant="outlined"
                        name="text"
                        sx={{ width: "65%" }}
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                    />
                </div>
                {formik.isSubmitting ? (
                    <CircularLoading />
                ) : (
                    <button
                        type="submit"
                        className={`btn btn-white icon-hoverable ${formik.isValid ? "" : "disabled"}`}
                        disabled={!formik.isValid}
                    >
                        <FaPaperPlane />
                    </button>
                )}
            </form>
            <div className="input-additions">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowDropzone(true);
                    }}
                    className="icon-hoverable"
                >
                    <FaRegImage />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowPicker(!showPicker);
                    }}
                    className="icon-hoverable"
                >
                    <FaRegSmile />
                </button>
            </div>
            {showPicker && (
                <div className="emoji-picker">
                    <Picker
                        data={data}
                        onEmojiSelect={(emoji: any) => {
                            formik.setFieldValue("text", formik.values.text + emoji.native);
                            setShowPicker(false);
                        }}
                        previewPosition="none"
                        onClickOutside={() => setShowPicker(false)}
                    />
                </div>
            )}
            {showDropzone && <Uploader handlePhotoChange={handlePhotoChange} />}
        </div>
    );
}
