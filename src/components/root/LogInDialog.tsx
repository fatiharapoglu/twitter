import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";

type DialogProps = {
    open: boolean;
    handleLogInClose: () => void;
};

export default function LogInDialog({ open, handleLogInClose }: DialogProps) {
    const validationSchema = yup.object({
        username: yup
            .string()
            .min(3, "Username should be of minimum 3 characters length.")
            .max(30, "Username should be of maximum 30 characters length.")
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
        onSubmit: async (values) => {
            const candidate = JSON.stringify(values);
            const response = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: candidate,
            });
            const json = await response.json();
            if (json.success) {
                handleLogInClose();
                // redirect to home
                console.log("Logged in successfully");
            } else {
                alert("something went wrong");
                // snackbar here
            }
        },
    });

    return (
        <Dialog className="dialog" open={open} onClose={handleLogInClose}>
            <DialogTitle className="title">Sign in to Twitter</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <div className="input-group">
                        <div className="input">
                            <TextField
                                fullWidth
                                id="username"
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
                                fullWidth
                                id="password"
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
                <DialogActions>
                    <button className="btn" type="submit">
                        Log In
                    </button>
                </DialogActions>
            </form>
            <DialogTitle>Don&apos;t have an account? Sign up</DialogTitle>
        </Dialog>
    );
}
