import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = () => {
        axios
            .get('http://localhost:8000/api/pet')
            .then((res) => setPets(res.data))
            .catch((err) => console.error(err));
    };

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const filteredPets = filterType
        ? pets.filter((pet) => pet.type === filterType)
        : pets;

    const sortedPets = filteredPets.sort((a, b) => a.type.localeCompare(b.type));

    return (
        <div className='List'>
            <h2>The pets are looking for a good home</h2>
            <div>
                {/* <label htmlFor='filterType'>Filter by Type:</label>
                <select id='filterType' name='filterType' value={filterType} onChange={handleFilterChange}>
                    <option value=''>All</option>
                    <option value='Dog'>Dog</option>
                    <option value='Cat'>Cat</option>
                    <option value='Bird'>Bird</option>
                </select> */}
            </div>
            <table class="table  table-striped">
                <thead class=" active">
                    <tr >
                        <th  class="table-active" scope="col">Name</th>
                        <th  class="table-active" scope="col">Type</th>
                        <th  class="table-active" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPets.map((pet) => (
                        <tr scope="row" key={pet._id}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to={`/pets/${pet._id}`}>Details</Link> |
                                <Link to={`/pets/${pet._id}/edit`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PetList;
