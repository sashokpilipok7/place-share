import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

function ImageUpload({ id, center, onInput = () => {}, errorText }) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if (!file) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewUrl(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  const filePickerRef = useRef();

  function pickedHandler(event) {
    console.log(event.target, "event.target");
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length !== 0) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  }

  function pickImageHandler() {
    filePickerRef.current.click();
  }
  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".png,.jpg,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{errorText}</p>}
    </div>
  );
}

export default ImageUpload;
