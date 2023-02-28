import { FileError } from "react-dropzone";

export const imageSizesValidator = (minHeight: number, minWight: number) => {
    return (file: File): FileError | FileError[] | null => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        //console.log(img)
        if (img.width <= minWight && img.height <= minHeight) {
            console.log(img, img.width, img.height);
            return {
                code: "image-sizes-too-small",
                message: `Image have to be at least ${minWight}px wight and ${minHeight}px height`,
            };
        } else {
            return null;
        }
    };
};
