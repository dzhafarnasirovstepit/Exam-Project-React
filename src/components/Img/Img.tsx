type ImgProps = {
    id?: string,
    src: string,
    alt: string
}

const Img = ({ id, src, alt }: ImgProps) => {
    return (
        <img id={id} src={src} alt={alt} />
    )
}

export default Img;