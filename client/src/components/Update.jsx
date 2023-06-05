// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import {  Link, useNavigate, useParams } from "react-router-dom";
// import DeleteButton from './Delete';
// // import AuthorForm from './Authorform';
// import PetForm from './Petform';
// const Update = (props) => {
    
    
//     const {id , setNameExist} = useParams(); 
//     const [pet, setPet] = useState();
//     const [loaded, setLoaded] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/pet/' + id)
//             .then(res => {
//                 setPet(res.data);
//                 setLoaded(true);
//             })
//     }, [])
//     const updateAuthor = pet => {
//         // setNameExist("")
//         axios.patch(`http://localhost:8000/api/pet/${id}/edit` , pet)
//             .then(res => console.log(res.data.error))
//             // .catch(err=> console.log(err))
//             // navigate('/')

//     }
//     return (
//         <div>
//             <h6>Edit this author:</h6>
//             {loaded && 
//                 <>
//                     <PetForm
//                         onSubmitProp={updateAuthor}
//                         initialName={pet.name}                        
//                         initialType={pet.type}                        
//                         initialDescription={pet.description}                        
//                         initialSkill1={pet.firstSkill}                        
//                         initialSkill2={pet.secondSkill}                        
//                         initialSkill3={pet.thirdSkill}                        
//                     />
//                     <DeleteButton authorId={pet._id} successCallback={() => navigate('/')} />
//                 </>
//             }
//         </div>
//     )
// }
// export default Update;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';
// import DeleteButton from './Delete';
import PetForm from './Petform';

const Update = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pet/${id}`)
      .then(res => {
        setPet(res.data);
        setLoaded(true);
      })
      .catch(error => console.error(error));
  }, [id]);

  const updatePet = updatedPet => {
    axios.patch(`http://localhost:8000/api/pet/${id}/edit`, updatedPet)
      .then(res => {
        console.log(res.data.error);
        // Handle successful update
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      {/* <DeleteButton petId={pet._id} successCallback={() => navigate('/')} /> */}

      {loaded && (
        <>
          <PetForm
            onSubmitProp={updatePet}
            id={pet._id}
            initialName={pet.name}
            initialType={pet.type}
            initialDescription={pet.description}
            initialSkill1={pet.firstSkill}
            initialSkill2={pet.secondSkill}
            initialSkill3={pet.thirdSkill}
          />
        </>
      )}
    </div>
  );
};

export default Update;
