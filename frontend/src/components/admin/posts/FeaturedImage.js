"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { uploadMedia, MAX_UPLOAD_BYTES, IMAGE_TYPES } from "@/services/mediaService";
import { errorMessage } from "@/lib/api";
import { mediaUrl } from "@/lib/media";
import styles from "./PostEditor.module.css";

export default function FeaturedImage({ value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) return setError("Please choose a JPG, PNG, WebP or GIF image.");
    if (file.size > MAX_UPLOAD_BYTES) return setError("Image is too large (max 10 MB).");

    setError("");
    setUploading(true);
    try {
      const media = await uploadMedia(file);
      onChange(media.url);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept={IMAGE_TYPES.join(",")} onChange={onFile} hidden />

      {value ? (
        <>
          <button
            type="button"
            className={styles.imagePreview}
            onClick={() => inputRef.current.click()}
            aria-label="Replace featured image"
            disabled={uploading}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(value)} alt="" />
          </button>
          <div className={styles.imageActions}>
            <button type="button" className="admin-link" onClick={() => inputRef.current.click()} disabled={uploading}>
              Replace image
            </button>
            <button type="button" className="admin-link admin-link--danger" onClick={() => onChange("")} disabled={uploading}>
              Remove
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className={styles.imagePlaceholder}
          onClick={() => inputRef.current.click()}
          disabled={uploading}
        >
          {uploading ? <LoaderCircle className={styles.spin} aria-hidden="true" /> : <ImagePlus aria-hidden="true" />}
          {uploading ? "Uploading…" : "Set featured image"}
        </button>
      )}

      {error && (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
