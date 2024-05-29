import React, {useEffect,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
import Category from './Category';
import {useHistory} from "react-router"
const Notesimage = () => {
    const context = useContext(NoteContext);
    let history = useHistory();
    const { notes, getNote, editNote,images,getimg,setchosecat,chosecat } = context;
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
             getNote(token);
             getimg();
     

           

        }else{
             history.push('/login')
        }
        // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
       
    }, [getimg]);
    const filteredImages = chosecat === 'All' ? images : images?.filter(image => image.category === chosecat);
  return (
    <div className="container row my-3">
      <h2>Displaying {chosecat} notes</h2>
      {filteredImages?.length > 0 ? (
        filteredImages.map(image => (
          <Category key={image._id} image={image} />
        ))
      ) : (
        <div className="col-12">
          <p className="text-center">No notes uploaded</p>
        </div>
      )}
    </div>
  )
}

export default Notesimage
