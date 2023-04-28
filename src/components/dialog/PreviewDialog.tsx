import { Modal } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

import { PreviewDialogProps } from "@/types/DialogProps";

export default function PreviewDialog({ open, handlePreviewClose, url }: PreviewDialogProps) {
    const fullUrl = `https://nifemmkaxhltrtqltltq.supabase.co/storage/v1/object/public/media/${url}`;

    return (
        <Modal className="preview-dialog" open={open}>
            <div>
                <AiOutlineClose className="btn-close icon-hoverable" onClick={handlePreviewClose} />
                <div className="image-wrapper">
                    <Image src={fullUrl} alt="" fill />
                </div>
            </div>
        </Modal>
    );
}
