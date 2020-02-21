'use strict'

var express = require('express');
var projectController = require('../controllers/project');
var router = express.Router();
//middleware para subir archivos
var multiparty = require('connect-multiparty');
var middlewareMultiparty = multiparty({ uploadDir: './images' });

router.get('/home/:id', projectController.home);
router.post('/save', projectController.saveProject);
router.get('/get-one/:id?', projectController.getProject);
router.get('/projects', projectController.getProjects);
router.put('/update/:id', projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);
router.post('/upload-image/:id', middlewareMultiparty, projectController.uploadImage );
router.get('/image/:image',projectController.getImage);


module.exports = router;
