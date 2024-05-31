import React, { useEffect, useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Category from './Category';
import { useHistory } from "react-router-dom";
import AddImageModal from './AddImageModel';
const Notesimage = () => {
  const context = useContext(NoteContext);
  const history = useHistory();
  const { getNote, images, getimg, chosecat } = context;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
      let token = localStorage.getItem('token');
      if (token) {
          getimg();
          console.log(images)
          
      } else {
          history.push('/login');
      }
  }, []);

  const filteredImages = images.filter(image => {
    if (chosecat === 'All') {
      return image.category !== 'personal';
    }
    return image.category === chosecat && image.category !== 'personal';
  });

  const openModal = () => {
      setShowModal(true);
  };

  const closeModal = () => {
      setShowModal(false);
  };

  return (
      <div className="container row">
          <div className="col-9">
              <h2>Displaying {chosecat} notes</h2>
          </div>
          <div className="col-3 text-right row justify-content-end">
              <button className="btn" style={{ backgroundColor: "#ADD8E6", color: 'black' }} onClick={openModal}>
                  Add
              </button>
          </div>
          {filteredImages.length > 0 ? (
    filteredImages.map((image, index) => (
        <Category key={index} imageArray={image.images} name={image.name} category={image.category} comment={image.comment} />
    ))
) : (
    <div className="col-12">
        <p className="text-center">No notes uploaded</p>
    </div>
)}

          <AddImageModal show={showModal} handleClose={closeModal} />
      </div>
  );
};

export default Notesimage;
