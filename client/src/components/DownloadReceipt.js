import { saveAs } from 'file-saver'

const Index = () => {
    const downloadImage = () => {
        saveAs('image_url', 'image.jpg') // Put your image url here.
    }

    return <Button className="btn btn-primary" onClick={downloadImage}>Download!</Button>
}