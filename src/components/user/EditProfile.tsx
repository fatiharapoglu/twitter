import { useRef, useState } from "react";
import { useFormik } from "formik";
import { Avatar, TextField } from "@mui/material";
import { MdOutlineAddAPhoto } from "react-icons/md";
import * as yup from "yup";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import { UserProps } from "@/types/UserProps";
import CircularLoading from "../misc/CircularLoading";
import { uploadFile } from "@/utilities/storage";
import { editUser } from "@/utilities/fetch";
import { getFullURL } from "@/utilities/misc/getFullURL";

export default function EditProfile({ profile, refreshToken }: { profile: UserProps; refreshToken: () => void }) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [headerPreview, setHeaderPreview] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [headerFile, setHeaderFile] = useState<File | null>(null);

    const headerUploadInputRef = useRef<HTMLInputElement>(null);
    const photoUploadInputRef = useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();

    const handleHeaderChange = (event: any) => {
        const file = event.target.files[0];
        setHeaderPreview(URL.createObjectURL(file));
        setHeaderFile(file);
    };
    const handleHeaderClick = () => {
        headerUploadInputRef.current?.click();
    };
    const handlePhotoChange = (event: any) => {
        const file = event.target.files[0];
        setPhotoPreview(URL.createObjectURL(file));
        setPhotoFile(file);
    };
    const handlePhotoClick = () => {
        photoUploadInputRef.current?.click();
    };

    const validationSchema = yup.object({
        name: yup.string().max(50, "Name should be of maximum 50 characters length."),
        description: yup.string().max(160, "Description should be of maximum 160 characters length."),
        location: yup.string().max(30, "Location should be of maximum 30 characters length."),
        website: yup.string().max(30, "Website should be of maximum 30 characters length."),
        photoUrl: yup.string(),
        headerUrl: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: profile.name ?? "",
            description: profile.description ?? "",
            location: profile.location ?? "",
            website: profile.website ?? "",
            headerUrl: profile.headerUrl ?? "",
            photoUrl: profile.photoUrl ?? "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (headerFile) {
                const path: string | void = await uploadFile(headerFile);
                if (!path) throw new Error("Header upload failed.");
                values.headerUrl = path;
            }
            if (photoFile) {
                const path: string | void = await uploadFile(photoFile);
                if (!path) throw new Error("Photo upload failed.");
                values.photoUrl = path;
            }
            const jsonValues = JSON.stringify(values);
            const response = await editUser(jsonValues, profile.username);
            if (!response.success) {
                console.log(response);
                return alert("Something went wrong. Please try again.");
            }
            alert("Profile updated successfully");
            refreshToken();
            queryClient.invalidateQueries(["users", profile.username]);
        },
    });

    return (
        <div className="edit-profile">
            <div className="profile-header">
                <Image
                    alt=""
                    src={
                        headerPreview
                            ? headerPreview
                            : profile.headerUrl
                            ? getFullURL(profile.headerUrl)
                            : "/assets/header.jpg"
                    }
                    fill
                />
                <div>
                    <MdOutlineAddAPhoto className="icon-hoverable add-photo" onClick={handleHeaderClick} />
                    <input
                        ref={headerUploadInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleHeaderChange}
                    />
                </div>
                <div className="avatar-wrapper">
                    <Avatar
                        sx={{ width: 125, height: 125 }}
                        alt=""
                        src={
                            photoPreview ? photoPreview : profile.photoUrl ? getFullURL(profile.photoUrl) : "/assets/egg.jpg"
                        }
                    />
                    <div>
                        <MdOutlineAddAPhoto className="icon-hoverable add-photo" onClick={handlePhotoClick} />
                        <input
                            ref={photoUploadInputRef}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handlePhotoChange}
                        />
                    </div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <h1>Edit profile</h1>
                    <div className="input">
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
                    <div className="input">
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            multiline
                            minRows={3}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </div>
                    <div className="input">
                        <TextField
                            fullWidth
                            name="location"
                            label="Location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            error={formik.touched.location && Boolean(formik.errors.location)}
                            helperText={formik.touched.location && formik.errors.location}
                        />
                    </div>
                    <div className="input">
                        <TextField
                            fullWidth
                            name="website"
                            label="Website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                            error={formik.touched.website && Boolean(formik.errors.website)}
                            helperText={formik.touched.website && formik.errors.website}
                        />
                    </div>
                    {formik.isSubmitting ? (
                        <CircularLoading />
                    ) : (
                        <button type="submit" className="btn btn-dark save">
                            Save
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
