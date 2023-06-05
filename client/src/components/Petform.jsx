import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import upload from './images/upload.svg';
import edit from './images/edit.svg';
import './Petform.css';

const PetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    firstSkill: '',
    secondSkill: '',
    thirdSkill: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // Fetch pet data if editing an existing pet
      axios
        .get(`http://localhost:8000/api/pet/${id}`)
        .then((response) => {
          setPet(response.data);
          setFormData(response.data);
          setErrors({});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = id
      ? `http://localhost:8000/api/pet/${id}/edit`
      : 'http://localhost:8000/api/pet';

    if (id) {
      // Update existing pet
      axios
        .patch(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          // Handle successful response
          if (response.data.errors) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          } else {
            // Reset form data and navigate
            setFormData({
              name: '',
              type: '',
              description: '',
              firstSkill: '',
              secondSkill: '',
              thirdSkill: '',
            });
            navigate('/');
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    } else {
      // Add new pet
      axios
        .post(apiUrl, formData)
        .then((response) => {
          console.log(response.data);
          // Handle successful response
          if (response.data.errors) {
            setErrors(response.data.errors);
            console.log(response.data.errors);
          } else {
            // Reset form data and navigate
            setFormData({
              name: '',
              type: '',
              description: '',
              firstSkill: '',
              secondSkill: '',
              thirdSkill: '',
            });
            navigate('/');
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }
  };

  return (
    <>
      <div className="header">
        <Link className="Link" to={'/'}>
          Back to home
        </Link>
      </div>
      <h2>{id ? `Edit ${pet.name}` : 'Know a pet needing a home?'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="first-part">
            <p>
              <label htmlFor="name">Pet Name:</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="error-message">
                  <span className="error-icon">&#9447; </span>
                  <span className="error-text">{errors.name.message}</span>
                </div>
              )}
            </p>
            <p>
              <label htmlFor="type">Pet Type:</label>
              <br />
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              {errors.type && (
                <div className="error-message">
                  <span className="error-icon">&#9447; </span>
                  <span className="error-text">{errors.type.message}</span>
                </div>
              )}
            </p>
            <p>
              <label htmlFor="description">Description:</label>
              <br />
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="error-message">
                  <span className="error-icon">&#9447; </span>
                  <span className="error-text">{errors.description.message}</span>
                </div>
              )}
            </p>
          </div>
          <div className="second-part">
            <h3>Skills (optionals):</h3>
            <p>
              <label htmlFor="skill1">Skill 1:</label>
              <br />
              <input
                type="text"
                id="skill1"
                name="firstSkill"
                value={formData.firstSkill}
                onChange={handleChange}
              />
              {errors.firstSkill && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  <span className="error-text">{errors.firstSkill.message}</span>
                </div>
              )}
            </p>
            <p>
              <label htmlFor="skill2">Skill 2:</label>
              <br />
              <input
                type="text"
                id="skill2"
                name="secondSkill"
                value={formData.secondSkill}
                onChange={handleChange}
              />
              {errors.secondSkill && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  <span className="error-text">{errors.secondSkill.message}</span>
                </div>
              )}
            </p>
            <p>
              <label htmlFor="skill3">Skill 3:</label>
              <br />
              <input
                type="text"
                id="skill3"
                name="thirdSkill"
                value={formData.thirdSkill}
                onChange={handleChange}
              />
              {errors.thirdSkill && (
                <div className="error-message">
                  <span className="error-icon">!</span>
                  <span className="error-text">{errors.thirdSkill.message}</span>
                </div>
              )}
            </p>
          </div>
        </div>
        <button type="submit">
          {id ? (
            <p>
              <img src={edit} alt="edit" /> Edit Pet
            </p>
          ) : (
            <p>
              <img src={upload} className="icon" alt="submit" />
              Add
            </p>
          )}
        </button>
      </form>
    </>
  );
};

export default PetForm;
