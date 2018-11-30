import { MOCK_BASE64_IMG } from '../../config/mockTestData'
import { PROFILE_PHOTO_SIZE, ACCEPT_IMAGE_FORMATS } from '../../config/files'
import { getImageWidthHeight, convertBase64ToFile } from '../file'

describe('getImageWidthHeight helper', function() {
  test('Draw data last 2 args should be equal to <PROFILE_PHOTO_SIZE>', () => {
    const mockSquareImage = {
      width: 500,
      height: 500,
    }

    const result = getImageWidthHeight(mockSquareImage, PROFILE_PHOTO_SIZE)

    expect(Array.isArray(result)).toBe(true)
    expect(result[2]).toBe(PROFILE_PHOTO_SIZE)
    expect(result[3]).toBe(PROFILE_PHOTO_SIZE)
  })

  test('Get draw data for square image', () => {
    const mockImage = {
      width: 500,
      height: 500,
    }

    const result = getImageWidthHeight(mockImage, PROFILE_PHOTO_SIZE)
    expect(result[0]).toBe(0)
    expect(result[1]).toBe(0)
  })

  test('Get draw data if image width < image height', () => {
    const mockSquareImage = {
      width: 678,
      height: 1289,
    }

    const result = getImageWidthHeight(mockSquareImage, PROFILE_PHOTO_SIZE)

    expect(result[0]).toBe(0)
    expect(Math.sign(result[1])).toBe(-1)
  })

  test('Get draw data if image width > image height', () => {
    const mockSquareImage = {
      width: 967,
      height: 478,
    }

    const result = getImageWidthHeight(mockSquareImage, PROFILE_PHOTO_SIZE)

    expect(Math.sign(result[0])).toBe(-1)
    expect(result[1]).toBe(0)
  })
})

describe('convertBase64ToFile helper', function() {
  test('Method should return file', async () => {
    const result = await convertBase64ToFile(MOCK_BASE64_IMG)

    expect(result.type).toEqual(ACCEPT_IMAGE_FORMATS.JPEG)
    expect(result.size).toBeDefined()
  })
})
