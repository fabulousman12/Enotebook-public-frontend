import React, { useState, useEffect,useContext } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import NoteContext from '../context/notes/NoteContext';
import '../Imagemodel.css';
import { Buffer } from 'buffer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
const Mynotesimg = ({ image,name,category,comment,imageid }) => {
    const context = useContext(NoteContext);

    const { deleteimg } = context;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    // Convert buffer to base64 string
    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    // Generate data URL for the image
    useEffect(() => {
        if (image.length > 0) {
            const urls = image.map(imagesin => {
                try {
                    const base64String = bufferToBase64(imagesin.data);
                    const url = `data:${imagesin.contentType};base64,${base64String}`;
                   console.log(name,category)
                    return url;
                } catch (error) {
                    console.error('Error converting buffer to base64:', error);
                    return null;
                }
            }).filter(url => url !== null);

            setImageUrls(urls);
        }
    }, [image]);

    const openLightbox = () => {
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };
    const downloadAllImagesAsZip = async () => {
        const zip = new JSZip();
        const imgFolder = zip.folder("images");

        imageUrls.forEach((url, index) => {
            const base64Data = url.split(',')[1];
            const imgName = `${name}_${index + 1}.jpg`;
            imgFolder.file(imgName, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${name}_images.zip`);
    };


    return (
        <div className="col-md-4 my-4 mx-3">
            {imageUrls.length > 0 && (
                <div className="card" style={{ position: 'relative', color: 'white' }}>
                    <img
                        src={imageUrls[0]}
                        alt={image.name}
                        className="card-img-top"
                        style={{ cursor: 'pointer' }}
                        onClick={openLightbox}
                    />
                    <div className="card-body " style={{ background: '#1a1a1a' }}>
                        <h1 cclassName={"mx-2 my-2"} style={{ fontSize: '2rem' }}>
                            {name}
                            {category === 'All' && (
                                <span className="badge text-bg-secondary my-2 mx-2">{category}</span>
                            )}
                        </h1>
                        <h5 className="card-title" style={{ fontSize: '1rem', color: 'white' }}>
                            {comment}
                        </h5>
                        <button
                            className="btn btn-danger"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                            onClick={() => deleteimg(imageid)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            )}
            {lightboxOpen && (
                <Lightbox
                    mainSrc={imageUrls[currentImageIndex]}
                    nextSrc={imageUrls[(currentImageIndex + 1) % imageUrls.length]}
                    prevSrc={imageUrls[(currentImageIndex + imageUrls.length - 1) % imageUrls.length]}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + imageUrls.length - 1) % imageUrls.length)
                    }
                    onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % imageUrls.length)}
                    toolbarButtons={[
                        
                        <button
                            key="downloadAll"
                            className="btn-primary"
                            style={{
                                backgroundColor: '#5bc0de',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}
                            onClick={downloadAllImagesAsZip}
                        >
                            <i className="fa fa-download" style={{ marginRight: '5px' }}></i>
                            Download All
                        </button>
                    ]}
                    
                />
            )}
        </div>
    );
};

export default Mynotesimg;
