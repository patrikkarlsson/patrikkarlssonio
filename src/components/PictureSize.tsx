
type Props = {
  filename: string,
  media: string,
}

const PictureSize = ({ 
  filename,
  media,
} : Props) => {
  return (
    <>
      <source srcSet={`${filename}/m/filters:format(webp)`} type="image/webp"  media={media} />
      <source srcSet={`${filename}`} media={media} />
    </>
  )
}

export default PictureSize