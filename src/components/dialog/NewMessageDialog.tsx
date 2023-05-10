import { useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle, TextField, InputAdornment } from "@mui/material";
import * as yup from "yup";
import { FaRegImage, FaRegSmile } from "react-icons/fa";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { NewMessageDialogProps } from "@/types/DialogProps";
import CircularLoading from "../misc/CircularLoading";
import { checkUserExists, createMessage } from "@/utilities/fetch";
import { uploadFile } from "@/utilities/storage";
import Uploader from "../misc/Uploader";

export default function NewMessageDialog({ open, handleNewMessageClose, token }: NewMessageDialogProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [showDropzone, setShowDropzone] = useState(false);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", token.username] });
        },
    });

    const handlePhotoChange = (file: File) => {
        setPhotoFile(file);
    };

    const validationSchema = yup.object({
        recipient: yup
            .string()
            .min(3, "Username should be of minimum 3 characters length.")
            .max(20, "Username should be of maximum 20 characters length.")
            .matches(/^[a-zA-Z0-9_]{1,14}[a-zA-Z0-9]$/, "Username is invalid")
            .required("Username is required.")
            .test("checkUserExists", "User does not exist.", async (value) => {
                if (value) {
                    const response = await checkUserExists(value);
                    if (response.success) return true;
                }
                return false;
            }),
        text: yup
            .string()
            .max(280, "Message text should be of maximum 280 characters length.")
            .required("Message text can't be empty."),
    });

    const formik = useFormik({
        initialValues: {
            sender: token.username,
            recipient: "",
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
            handleNewMessageClose();
            resetForm();
            setShowDropzone(false);
        },
    });

    return (
        <Dialog className="dialog" open={open} onClose={handleNewMessageClose} fullWidth>
            <DialogTitle className="title">New Message</DialogTitle>
            <form className="dialog-form new-message-form" onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="input-group">
                        <div className="input">
                            <TextField
                                fullWidth
                                hiddenLabel
                                name="recipient"
                                placeholder="username"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                }}
                                value={formik.values.recipient}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.recipient)}
                                helperText={formik.errors.recipient}
                                autoFocus
                            />
                        </div>
                        <div className="input">
                            <TextField
                                placeholder="Message"
                                multiline
                                hiddenLabel
                                variant="outlined"
                                fullWidth
                                name="text"
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                            />
                        </div>
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
                            />
                        </div>
                    )}
                    {showDropzone && <Uploader handlePhotoChange={handlePhotoChange} />}
                </DialogContent>
                {formik.isSubmitting ? (
                    <CircularLoading />
                ) : (
                    <button
                        className={`btn btn-dark ${formik.isValid ? "" : "disabled"}`}
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        Send
                    </button>
                )}
            </form>
        </Dialog>
    );
}
