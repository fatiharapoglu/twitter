import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { SignUpDialogProps } from "@/types/DialogProps";
import { createUser } from "@/utilities/fetch";

export default function SignUpDialog({ open, handleSignUpClose }: SignUpDialogProps) {
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
        name: yup.string().max(50, "Name should be of maximum 50 characters length."),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            name: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const json = await createUser(JSON.stringify(values));
            if (!json.success) {
                console.log(json);
                return alert("Something went wrong");
                // snackbar here
            }
            handleSignUpClose();
            // redirect to home
            console.log("Created successfully");
        },
    });

    return (
        <Dialog className="dialog" open={open} onClose={handleSignUpClose}>
            <DialogTitle className="title">Create your account</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="input-group">
                        <div className="input">
                            <div className="info">Your login information</div>
                            <TextField
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </div>
                        <div className="input">
                            <TextField
                                required
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
                        <div className="input">
                            <div className="info">Your public name</div>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className="btn" onClick={handleSignUpClose}>
                        Cancel
                    </button>
                    <button className="btn" type="submit">
                        Create
                    </button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
