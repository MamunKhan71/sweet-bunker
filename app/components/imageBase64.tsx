"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";

interface ImageFromBase64Props {
    base64String: string;
}

const ImageFromBase64: React.FC<ImageFromBase64Props> = ({ base64String }) => {
    const [open, setOpen] = useState(false);

    const imgSrc = base64String.startsWith("data:image")
        ? base64String
        : `data:image/png;base64,${base64String}`;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <img
                    src={imgSrc}
                    alt="Base64 Image"
                    onClick={() => setOpen(true)}
                    className="cursor-pointer max-w-full rounded-lg shadow-md"
                />
            </DialogTrigger>

            <DialogContent className="min-w-fit h-[70vh] p-0 overflow-hidden bg-black">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={imgSrc}
                        alt="Full View"
                        className="max-w-full max-h-full object-cover"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageFromBase64;
