"use client";
import { useRef, useState } from "react";
import styles from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [uploadedImage, setUploadedImage] = useState();

  const imageInputRef = useRef();

  function handleSelectImage() {
    imageInputRef.current.click();
  }

  // const [uploadedImage, setUploadedImage] = useState();

  function handleImageInputChanged(event) {
    // - "file" input type will have .files
    const uploadedFile = event.target.files[0];

    if (!uploadedFile) {
      setUploadedImage(null); // - reset the preview
      return;
    }

    // - convert the image into a dataUrl so it can be
    // used to preview
    const fileReader = new FileReader(); // FileReader, built into JS
    fileReader.onload = () => {
      const theResult = fileReader.result;
      setUploadedImage(theResult);
    };

    fileReader.readAsDataURL(uploadedFile);
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className={styles.picker}>
        <div className={styles.controlls}>
          <div className={styles.preview}>
            {!uploadedImage && <p>Select an image file...</p>}

            {uploadedImage && (
              <Image src={uploadedImage} alt='Your selected image' fill />
            )}
          </div>

          <input
            className={styles.input}
            id={name}
            name={name}
            type='file'
            accept='image/png, image/jpeg'
            ref={imageInputRef}
            onChange={handleImageInputChanged}
            required
          />
        </div>

        <div>
          <button
            type='button'
            onClick={handleSelectImage}
            className={styles.button}
          >
            Select a recipe image
          </button>
        </div>
      </div>
    </>
  );
}
