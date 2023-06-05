import React, { useState } from 'react';
import axios from 'axios'
// import PetList from '../components/Authorlist';
import PetList from '../components/Petlist';
import { Link } from 'react-router-dom';


const Main = (props) => {

    const [petList, setPetList] = useState([]);

    const removeFromDom = petId => {
        axios.delete("http://localhost:8000/api/pet/" + petId)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setPetList(PetList.filter(pet => pet._id !== petId));
            })
            .catch((err) => console.log(err))

    }

    return (
        <div>
            <div className="header">
                 <Link to={"pets/new"} className='Link'>add a pet to shelter</Link>
            </div><br />
            {/* <h3>Those pets are looking for a good home</h3><br /> */}
            <PetList petList={petList} removeFromDom={removeFromDom} />
        </div>
    )
}
export default Main;
