import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, TextField, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";

import { LogInDialogProps } from "@/types/DialogProps";
import { logIn } from "@/utilities/fetch";
import CircularLoading from "../misc/CircularLoading";

export default function LogInDialog({ open, handleLogInClose }: LogInDialogProps) {
    const router = useRouter();

    const validationSchema = yup.object({
        username: yup
            .string()
            .min(3, "Username should be of minimum 3 characters length.")
            .max(20, "Username should be of maximum 20 characters length.")
            .matches(/^[a-zA-Z0-9_]{1,14}[a-zA-Z0-9]$/, "Username is invalid")
            .required("Username is required."),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length.")
            .max(100, "Password should be of maximum 100 characters length.")
            .required("Password is required."),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const response = await logIn(JSON.stringify(values));
            if (!response.success) {
                console.log(response);
                return alert("Something went wrong. Please try again.");
                // snackbar here
            }
            resetForm();
            handleLogInClose();
            console.log("Logged in successfully.");
            router.push("/home");
        },
    });

    return (
        <Dialog className="dialog" open={open} onClose={handleLogInClose}>
            <Image className="dialog-icon" src="/assets/favicon.png" alt="" width={40} height={40} />
            <DialogTitle className="title">Sign in to Twitter</DialogTitle>
            <form className="dialog-form" onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="input-group">
                        <div className="input">
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                placeholder="username"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">@</InputAdornment>,
                                }}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </div>
                        <div className="input">
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </div>
                    </div>
                </DialogContent>
                {formik.isSubmitting ? (
                    <CircularLoading />
                ) : (
                    <button className="btn btn-dark" type="submit">
                        Log In
                    </button>
                )}
            </form>
        </Dialog>
    );
}
