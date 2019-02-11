import EXIF from 'exif-js'

import { ACCEPT_IMAGE_FORMATS, PROFILE_PHOTO_QUALITY } from 'config/files'

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

function getExifOrientation(file) {
  return new Promise((resolve, reject) => {
    EXIF.getData(file, function() {
      const allMetaData = EXIF.getAllTags(this)
      resolve(allMetaData.Orientation)
    })
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

    // When a picture is taken from a mobile phone (iphone) and uploaded from to our website
    // it is rotated with an angle of -90° by default. We handle orientation of picture.
    // links:
    // - https://medium.com/wassa/handle-image-rotation-on-mobile-266b7bd5a1e6
    // - https://stackoverflow.com/questions/23346166/rotate-image-by-90-degrees-on-html5-canvas
    const exifOrientation = await getExifOrientation(file)

    if (exifOrientation) {
      switch (exifOrientation) {
        case 8:
          canvasContext.translate(canvas.width / 2, canvas.height / 2)
          canvasContext.rotate((-90 * Math.PI) / 180)
          canvasContext.translate(-canvas.width / 2, -canvas.height / 2)
          break
        case 3:
          canvasContext.translate(canvas.width / 2, canvas.height / 2)
          canvasContext.rotate((180 * Math.PI) / 180)
          canvasContext.translate(-canvas.width / 2, -canvas.height / 2)
          break
        case 6:
          canvasContext.translate(canvas.width / 2, canvas.height / 2)
          canvasContext.rotate((90 * Math.PI) / 180)
          canvasContext.translate(-canvas.width / 2, -canvas.height / 2)
          break
      }
    }

    canvasContext.drawImage(image, ...getImageWidthHeight(image, size))

    return {
      photo: canvas.toDataURL(ACCEPT_IMAGE_FORMATS.JPEG, PROFILE_PHOTO_QUALITY),
    }
  } catch (error) {
    return { error }
  }
}

export function convertBytesToMegabytes(bytes, decimal = 2) {
  return Number((bytes / 1024 / 1024).toFixed(decimal))
}
