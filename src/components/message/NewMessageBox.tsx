import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { FaPaperPlane, FaRegImage, FaRegSmile } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import * as yup from "yup";

import CircularLoading from "../misc/CircularLoading";
import { UserProps } from "@/types/UserProps";
import Uploader from "../misc/Uploader";
import { createMessage } from "@/utilities/fetch";
import { uploadFile } from "@/utilities/storage";

export default function NewMessageBox({ messagedUsername, token }: { token: UserProps; messagedUsername: string }) {
    const [showPicker, setShowPicker] = useState(false);
    const [showDropzone, setShowDropzone] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", token.username] });
        },
        onError: (error) => console.log(error),
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
            recipient: messagedUsername,
            text: "",
            photoUrl: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (photoFile) {
                const path: string | void = await uploadFile(photoFile);
                if (!path) throw new Error("Error uploading image.");
                values.photoUrl = path;
                setPhotoFile(null);
            }
            mutation.mutate(JSON.stringify(values));
            resetForm();
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
                        helperText={formik.touched.text && formik.errors.text}
                    />
                </div>
                {formik.isSubmitting ? (
                    <CircularLoading />
                ) : (
                    <button className="btn btn-white icon-hoverable" type="submit">
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
