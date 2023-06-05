const Pet = require('../models/pet.model');

module.exports.getAllPets=(req,response)=>{
    Pet.find({})
    .then(pet=>{
        console.log(pet);
        response.json(pet);
    })
    .catch(err=>{
        console.log(err)
        response.json(err)
    })
}

module.exports.findOnePet=(req,res)=>{
    Pet.findOne({_id:req.params.id})
    .then(pet=>res.json(pet))
    .catch(err=> res.json(err))
}

module.exports.createPet=(req,res)=>{

    Pet.exists({name: req.body.name})
    .then(PetExists => {
        if (PetExists) {
            // Promise.reject() will activate the .catch() below.
            return Promise.reject({message:'This Pet Exist'});
        }return Pet.create(req.body)})
        .then(saveResult => res.json( saveResult))
        .catch(err => res.json(err));
}

module.exports.updatePet=(req,res)=>{
     Pet.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
    .then(saveResult => res.json(saveResult))
    .catch(err => res.json({error:err}));
  
        
}
module.exports.deletePet=(req,res)=>{
    Pet.deleteOne({_id:req.params.id})
    .then(result=>{
        res.json({result:result})
    })
    .catch(err=>{
        res.json({message:'Somthing went wrong...', error:err})
        console.log(err)
    })
}