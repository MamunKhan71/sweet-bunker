"use client";

import React from "react";

interface ImageFromBase64Props {
    base64String: string;
}

const ImageFromBase64: React.FC<ImageFromBase64Props> = ({ base64String }) => {
    const imgSrc = base64String.startsWith("data:image")
        ? base64String
        : `data:image/png;base64,${base64String}`;

    return (
        <div>
            <img src={imgSrc} alt="Base64 Image" style={{ maxWidth: "100%" }} />
        </div>
    );
};

export default ImageFromBase64;