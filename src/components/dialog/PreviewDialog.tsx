import { Dialog } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

import { PreviewDialogProps } from "@/types/DialogProps";

export default function PreviewDialog({ open, handlePreviewClose, url }: PreviewDialogProps) {
    const fullUrl = `https://nifemmkaxhltrtqltltq.supabase.co/storage/v1/object/public/media/${url}`;

    return (
        <Dialog open={open} scroll="body">
            <div className="preview-dialog">
                <AiOutlineClose className="btn-close" onClick={handlePreviewClose} />
                <div className="image-wrapper">
                    <Image src={fullUrl} alt="" fill />
                </div>
            </div>
        </Dialog>
    );
}
