import React from 'react'

// Image component with blur loading feature
class ProgressiveImage extends React.Component {
  state = {
    currentImage: this.props.preview,
    loading: true,
  }

  componentDidMount() {
    this.fetchImage(this.props.image)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.image !== this.props.image) {
      this.setState({ currentImage: this.props.preview, loading: true }, () => {
        this.fetchImage(this.props.image)
      })
    }
  }

  componentWillUnmount() {
    if (this.loadingImage) {
      this.loadingImage.removeEventListener('load', null)
    }
  }

  fetchImage = src => {
    const image = new Image()
    image.addEventListener('load', () =>
      this.setState({ currentImage: this.loadingImage.src, loading: false }),
    )
    image.src = src
    this.loadingImage = image
  }

  style = loading => {
    return {
      transition: '0.5s filter linear',
      filter: `${loading ? 'blur(50px)' : ''}`,
    }
  }

  render() {
    const { currentImage, loading } = this.state
    const { alt } = this.props
    return <img style={this.style(loading)} src={currentImage} alt={alt} />
  }
}

ProgressiveImage.propTypes = {
  preview: Object,
  image: Object,
  alt: String,
}

export default ProgressiveImage
