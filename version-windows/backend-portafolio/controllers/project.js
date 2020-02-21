'use strict'
var Project = require('../models/project');
//Libreria de node de file system
var fs = require('fs');
//Libreria para rutas fisicas de los archivos
var path = require('path');

var controller = {
    
    home: function(req, res){
        var id = req.params.id;

        return res.status(200).send({
            message: "soy una ruta de prueba",
            id: id
        });
    },
    saveProject: function(req, res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = params.image;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({ message: "Error al guardar" });
            
            if(!projectStored) return res.status(404).send({ message: "No se pudo encontrar el proyecto" });
            
            return res.status(200).send({ project: projectStored });
        });
    },
    getProject: function(req, res){
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message: "El proyecto no existe"});
        
        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: "Error al devolver datos"});
           
            if(!project) return res.status(404).send({message: "El proyecto no existe"});
            
            return res.status(200).send({ project });
        });
    },
    getProjects: function(req, res){
        Project.find({}).limit(5).exec((err, projects) =>{
            if(err) return res.status(500).send({message: "Error al devolver los proyectos"});
            if(!projects) return res.status(404).send({message: "No se encontraron proyectos"});
            
            return res.status(200).send({ projects });
        });
    },
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;
        if(projectId == null) return res.status(404).send({message: "El proyecto no existe"});
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: "Error al devolver el proyecto"});
            
            if(!projectUpdated) return res.status(404).send({message: "No se encontro el proyecto"});
            
            return res.status(200).send({ project: projectUpdated });
        });
    },
    deleteProject: function(req, res){
        var projectId =  req.params.id;
        Project.findByIdAndRemove(projectId, (err, projectRemoved)=> {
            if(err) return res.status(500).send({message: "Error al remover el proyecto" });
            if(!projectRemoved) return res.status(404).send({message:"No se puede remover el proyecto"});

            return res.status(200).send({ project: projectRemoved });
        });
    },
    uploadImage: function(req, res){
        var projectId = req.params.id;
        var fileName = "No se encontro la imagen...";
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
     
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'pneg' || fileExt == 'gif' ){
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated)=> {
                    if(err) return res.status(500).send({message: "Error al subir la imagen" });
                    if(!projectUpdated) return res.status(404).send({message:"No se puede actualizar la imagen"});

                    return res.status(200).send({ project: projectUpdated });
                });
            }else{
                fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: "Formato de imagen invalido"});
                });
            }
        }else{
            return res.status(200).send({ image: fileName });
        }
    },

    getImage: function(req, res){
        var image_name = req.params.image;
        var path_image = './images/'+image_name;

        fs.exists(path_image, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_image));
            }else{
                if(!exists){
                    return res.status(200).send({ message: "No se encontro la imagen" });
                }
            }
        });
    }
};

module.exports = controller;
