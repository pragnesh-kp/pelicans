export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

const UPLOAD_MESSAGES = {
  LIMIT_FILE_SIZE: "File is too large (max 10 MB).",
  LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
};

// Express 5 forwards errors from async handlers here automatically
export function errorHandler(err, req, res, next) {
  // File upload problems (multer) are the user's input, not a server crash
  if (err.name === "MulterError") {
    return res.status(400).json({ message: UPLOAD_MESSAGES[err.code] || "File upload failed." });
  }

  const status = err.statusCode || err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({
    message: status >= 500 ? "Server error" : err.message,
    ...(err.errors && { errors: err.errors }),
  });
}
