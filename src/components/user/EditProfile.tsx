import { useFormik } from "formik";

import { UserProps } from "@/types/UserProps";
import { TextField } from "@mui/material";

export default function EditProfile({ profile }: { profile: UserProps }) {
    const formik = useFormik({
        initialValues: {
            headerUrl: profile.headerUrl ?? "",
            photoUrl: profile.photoUrl ?? "",
            name: profile.name ?? "",
            description: profile.description ?? "",
            location: profile.location ?? "",
            age: profile.age ?? "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Header photo"
                name="headerUrl"
                value={formik.values.headerUrl}
                onChange={formik.handleChange}
            />
            <TextField label="Profile photo" name="photoUrl" value={formik.values.photoUrl} onChange={formik.handleChange} />
            <TextField label="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
            <TextField label="Bio" name="description" value={formik.values.description} onChange={formik.handleChange} />
            <TextField label="Location" name="location" value={formik.values.location} onChange={formik.handleChange} />
            <TextField label="Birth" name="age" value={formik.values.age} onChange={formik.handleChange} />
            <button type="submit">Save</button>
        </form>
    );
}
