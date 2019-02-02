const NO_IMAGE_DEFAULT= 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/a/ac/20070325222640%21No_image_available.svg/120px-No_image_available.svg.png'

export function secureImageURL(url) {
  if (!url) {
    return
  }
  const imageURL = new URL(url)
  imageURL.protocol = 'https'
  return imageURL.toString()
}

export function getImageURL(imageInfo) {
  if (imageInfo.imageLinks) {
    return secureImageURL(imageInfo.imageLinks.smallThumbnail) || NO_IMAGE_DEFAULT
  } else {
    return NO_IMAGE_DEFAULT
  }
}

export function handleMultipleAuthors(authors) {
  return authors ? authors.join(', ') : ''
}

export function parseReponse(data) {
  if (data.totalItems > 0) { 
    const parsedResults = data.items.map(x => {
      const info = x.volumeInfo
      return {
        author: handleMultipleAuthors(info.authors),
        title: info.title ||  '',
        publishingCompany: info.publisher || '',
        bookImageURL: getImageURL(info),
        description: info.description || '',
        infoLink: info.infoLink || '',
        id: x.id
      }
    })
    return {
      results: parsedResults,
      noResults: false,
      isError: false
    }
  } else if (data.totalItems === 0) {
    return {
      results: [],
      noResults: true,
      isError: false
    }
  } else {
    return {
      results: [],
      noResults: false,
      isError: true
    }
  }
}