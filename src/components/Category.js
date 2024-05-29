import React,{useState} from 'react'

const Category = ({image}) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    

    // Ensure the image object has data and contentType properties
    if (!image || !image.image || !image.image.data || !image.image.contentType) {
        return <p>Invalid image data</p>;
    }

    // Convert image buffer to Base64 string using browser-compatible method
    const arrayBufferView = new Uint8Array(image.image.data.data);
    const base64String = btoa(
        arrayBufferView.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const srcString = `data:${image.image.contentType};base64,${base64String}`;

    const handleDelete=() =>{

    }

    return (
        <div className="col-md-6 my-2">
            {/* <div className="card">
                <img src={srcString} alt={image.name} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{image.name}</h5>
                    <p className="card-text">{image.category}</p>
                   
                </div>
            </div> */}
            <div className="card" style={{width: '25rem' }}>
            <img src={srcString} alt={image.name} className="card-img-top" />
  <div className="card-body" style={{background:'#1a1a1a'}}>
    <h5 className="card-title" style={{fontSize:'2rem'}}>{image.name}</h5>
    <p className="card-text">{image.category}</p>
   
  </div>
</div>
        </div>
    );
}

export default Category;
