import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";

type DialogProps = {
    open: boolean;
    handleSignUpClose: () => void;
};

export default function SignUpDialog({ open, handleSignUpClose }: DialogProps) {
    const validationSchema = yup.object({
        email: yup.string().email("Enter a valid email.").required("Email is required."),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length.")
            .max(100, "Password should be of maximum 100 characters length.")
            .required("Password is required."),
        username: yup
            .string()
            .min(3, "Username should be of minimum 3 characters length.")
            .max(30, "Username should be of maximum 30 characters length.")
            .required("Username is required."),
        name: yup.string().max(50, "Name should be of maximum 50 characters length."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
            name: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
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
                                fullWidth
                                required
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className="input">
                            <TextField
                                fullWidth
                                required
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
                        <div className="input">
                            <div className="info">Your public name (@username)</div>
                            <TextField
                                fullWidth
                                required
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
                            <div className="info">What do you want to be seen like?</div>
                            <TextField
                                fullWidth
                                id="name"
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
                    <button onClick={handleSignUpClose}>Cancel</button>
                    <button type="submit">Create</button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
