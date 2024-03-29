export const PROFILE_PHOTO_SIZE_LIMIT = 400 // 400x400 px
export const PROFILE_PHOTO_WEIGHT_LIMIT = 10 // megabytes
export const FILE_SIZE_LIMIT = 10 * 1024 * 1024 // 10 MB in bytes

export const ACCEPT_IMAGE_FORMATS = {
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  X_PNG: 'image/x-png',
  GIF: 'image/gif',
}

// A Number between 0 and 1 indicating the image quality to use for
// image formats that use lossy compression such as image/jpeg
export const PROFILE_PHOTO_QUALITY = 0.8
