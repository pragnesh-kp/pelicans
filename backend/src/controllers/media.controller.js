import { Media } from "../models/media.model.js";
import { ApiError } from "../utils/ApiError.js";

export const getAll = async (req, res) => res.json(await Media.findAll());

export async function upload(req, res) {
  if (!req.file) throw new ApiError(400, "No file uploaded or file type not allowed");
  const media = await Media.create({
    filename: req.file.filename,
    original_name: req.file.originalname,
    mime_type: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`,
    uploaded_by: req.user.id,
  });
  res.status(201).json(media);
}
