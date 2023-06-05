import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import like from './images/like.svg'
import DeleteButton from './Delete';

const Detail = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const [isLiked, setIsLiked] = useState(true); // Initially disabled
    const [likesCount, setLikesCount] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pet/${id}`)
            .then((res) => {
                console.log(res.data);
                setPet(res.data);
                setIsLiked(false); // Enable the like button once the pet data is loaded
                setLikesCount(res.data.likes);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleLike = () => {
        const updatedPet = { ...pet, likes: likesCount + 1 };

        axios
            .patch(`http://localhost:8000/api/pet/${id}/edit`, updatedPet)
            .then((res) => {
                console.log(res.data.error);
                // Handle successful update
            })
            .catch((error) => console.error(error));

        setLikesCount((prevCount) => prevCount + 1);
        setIsLiked(true);
        console.log('Liked!');
    };

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/pet/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (<>
    <div className='header'>
            <Link className='Link'to={'/'}>back to home</Link></div>
        <div className='nav'><h2>Details about {pet.name}</h2>
            <DeleteButton petName={pet.name} handleDelete={handleDelete} /></div>
        
        <div>
            
            {/* <p>Name: {pet.name}</p>
            <p>Type: {pet.type}</p>
            <p>Description: {pet.description}</p>
            <p>Skill 1: {pet.firstSkill}</p>
            <p>Skill 2: {pet.secondSkill}</p>
            <p>Skill 3: {pet.thirdSkill}</p> */}

            <table className='table list'>
                <tr>
                    <td><b> Name:</b></td>
                    <td>{pet.name}</td>
                </tr>
                <tr>
                    <td><b>Type :</b></td>
                    <td>{pet.type}</td>
                </tr>
                <tr>
                    <td><b>Description:</b> </td>
                    <td>{pet.description}</td>
                </tr>
                <tr>
                    <td><b>Skill :</b> </td>
                    <td>{pet.firstSkill}</td>
                </tr>
                <tr>
                    {/* <td><b>Skill 2:</b> </td> */}
                    <td></td>
                    <td>{pet.secondSkill}</td>
                </tr>
                <tr>
                    {/* <td><b>Skill 3:</b> </td> */}
                    <td></td>
                    <td>{pet.thirdSkill}</td>
                </tr>
            </table>
            <div className='footer'>
                
                <button style={{backgroundColor:"green"}} onClick={handleLike} disabled={isLiked}>
                    <img src={like} alt="" /> Like "{pet.name}"
                </button>{likesCount} like(s) 
            </div>

        </div>
    </>
    );
};

export default Detail;
