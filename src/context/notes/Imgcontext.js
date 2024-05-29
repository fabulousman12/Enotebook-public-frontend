import React, { useState, useEffect,useContext } from "react";
import NoteContext from "./NoteContext";

const Imgstate = (props) =>{
    const context = useContext(NoteContext);
    const { host } = context;
    const [images, setImages] = useState([]);
    const [chosecat, setchosecat] = useState("All");
    const [categories, setCategories] = useState(['Maths', 'Physics', 'Bio', 'Chem' , 'Stat' , 'Computer' , 'English' , 'Constituition','Electronics','tech','others']); // Replace with actual categories
const getimg = async()=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${host}/api/img/files`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Auth': token
        }
      });
      const json = await response.json();
    setImages(json);
      
    };
 





    return (
        <NoteContext.Provider value={{ }}>
          {props.children}
        </NoteContext.Provider>
      );
    



}

export default Imgstate;
