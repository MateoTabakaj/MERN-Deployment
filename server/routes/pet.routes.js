const PetControllers = require('../controllers/pet.controller')

module.exports=app=>{
    app.get('/api/pet', PetControllers.getAllPets);
    app.get('/api/pet/:id', PetControllers.findOnePet);
    app.post('/api/pet/', PetControllers.createPet);
    app.patch('/api/pet/:id/edit', PetControllers.updatePet);
    app.delete('/api/pet/:id', PetControllers.deletePet);
}