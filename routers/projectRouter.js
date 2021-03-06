const express = require('express');
const projectDb = require('../data/helpers/projectModel.js');
 const router = express.Router();
 router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.json(projects)
        })
       
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' })
        })
})
 router.get('/:id', (req, res) => {
     const { id } = req.params;
     projectDb.get(id)
        .then(project => {
            if (project) {
                res.json(project)
            } else {
                res.status(404).json({ message: 'Porject does not exoist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project' })
        })
})
 router.get('/:id/actions', (req, res) => {
     const { id } = req.params;
     projectDb.getProjectActions(id)
        .then(projectActions => {
            if (projectActions) {
                res.json(projectActions)
            } else {
                res.status(404).json({ message: 'Project does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get project actions' })
        })
})
 router.post('/', (req, res) => {
     const project = req.body;
     if (project.name && project.description) {
        projectDb.insert(project)
            .then(idInfo => {
                projectDb.get(idInfo.id).then(project => {
                    res.status(201).json(project)
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to get project' })
            })
    } else {
        res.status(400).json({
            message: 'Missing name or description'
        })
    }
})
 router.delete('/:id', (req, res) => {
     const { id } = req.params;
    const project = req.body;
     projectDb.remove(id)
        .then(count => {
            if (count) {
                res.json(project)
            } else {
                res.status(404).json({ message: 'Porject does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete project' })
        })
})
 router.put('/:id', (req, res) => {
     const { id } = req.params;
    const project = req.body;
     if (project.name && project.description) {
        projectDb.update(id, project)
            .then(project => {
                if (id) {
                    res.json({ message: 'Project has been updated' })
                } else {
                    res.status(404).json({ message: 'The project does not exist' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update project' })
            })
    } else {
        res.status(400).json({ message: 'Missing name or description' })
    }
})
 module.exports = router; 