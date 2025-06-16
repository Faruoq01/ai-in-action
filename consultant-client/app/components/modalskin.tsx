import * as React from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import Modal from "@mui/material/Modal";

export function ModalSkin({children, open, setOpen}: any) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[90%] sm:max-w-[425px] bg-[#ECEDF1] rounded-[0px]">
                { children }
            </DialogContent>
        </Dialog>
    )
}

export function ApplyCourseSkin({children, open, setOpen}: any) {

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
            <div className="w-[90%] sm:max-w-[800px] bg-[#011B23] rounded-[10px] overflow-hidden border-[0.5px] border-[#747474]">
                { children }
            </div>
        </Modal>
    )
}
