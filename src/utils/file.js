import { ACCEPT_IMAGE_FORMATS, PROFILE_PHOTO_QUALITY } from '../config/files'

/*
 * Helper for draw image in canvas.
 * Return coordinates for canvas
 *
 * Usage:
 *  ctx.drawImage(image, ...[dx, dy, dWidth, dHeight]);
 * dx - the x-axis coordinate
 * dy - the y-axis coordinate
 * dWidth - the width to draw the image in the destination canvas
 * dHeight - the height to draw the image in the destination canvas
 */
export function getImageWidthHeight(img, sideSize) {
  const { width, height } = img
  if (width === height) {
    return [0, 0, sideSize, sideSize]
  } else if (width < height) {
    const ratio = height / width
    const top = (sideSize * ratio - sideSize) / 2
    return [0, -1 * top, sideSize, sideSize * ratio]
  } else {
    const ratio = width / height
    const left = (sideSize * ratio - sideSize) / 2
    return [-1 * left, 0, sideSize * ratio, sideSize]
  }
}

export function convertBase64ToFile(base64img) {
  const byteString = atob(base64img.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i)
  }
  const newBlob = new Blob([ab], {
    type: ACCEPT_IMAGE_FORMATS.JPEG,
  })

  return newBlob
}

async function readFileAsDataURL(file) {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.addEventListener('error', () => {
      temporaryFileReader.abort()
      reject(new Error({ error: 'app.errors.image.parsing' }))
    })

    temporaryFileReader.addEventListener('load', () => {
      resolve({ file: temporaryFileReader.result })
    })
    temporaryFileReader.readAsDataURL(file)
  })
}

async function loadImage(file) {
  const image = new Image()

  return new Promise((resolve, reject) => {
    image.addEventListener('error', () => {
      reject(new Error({ error: 'app.errors.image.parsing' }))
    })

    image.addEventListener('load', () => {
      resolve({ image })
    })
    image.src = file
  })
}

export async function croppResizeProfilePhoto({ file, size, canvas }) {
  try {
    const resultReadFile = await readFileAsDataURL(file)
    const { image } = await loadImage(resultReadFile.file)

    if (image.height < size || image.width < size) {
      return { error: 'app.errors.image.wrongSize' }
    }

    const canvasContext = canvas.getContext('2d')

    canvas.height = canvas.width = size
    canvasContext.drawImage(image, ...getImageWidthHeight(image, size))

    return {
      photo: canvas.toDataURL(ACCEPT_IMAGE_FORMATS.JPEG, PROFILE_PHOTO_QUALITY),
    }
  } catch (error) {
    return { error }
  }
}
