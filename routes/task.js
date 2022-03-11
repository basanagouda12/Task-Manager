const express = require('express')
const router = express.Router()
const Task = require('../models/tasks')


router.get('/', async(req,res) => {
    try{
           const Tasks = await Task.find()
           console.log(Tasks)
           return res.json(Tasks)
        //    Tasks.forEach(task => {
        //     if(task.archive == true){
        //         console.log(task)
        //     }
        //    });
           
           
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const Tasks = await Task.findById(req.params.id)
           res.json(Tasks)
    }catch(err){
        res.send('Error ' + err)
    }
})



router.post('/', async(req,res) => {
    const Tasks = new Task({
        title: req.body.title,
        // archive: req.body.archive,
        // inProgress: req.body.inProgress,
        // completed: req.body.completed,
        
    })

  
    try{
        const a1 =  await Tasks.save() 
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const Tasks = await Task.findById(req.params.id) 
        
        const a1 = await Tasks.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

router.post('/subtask/:id',async(req, res) => {
   
    const Tasks = await Task.findById(req.params.id)
    let t = Tasks.subtasks
    t.push(req.body)
    console.log(t)
    Task.findOneAndUpdate({ _id: req.params.id }, {
        subtasks:  t
        
    }).then(() => {
        res.send({ 'message': 'subTasks added successfully'});
    });
});

router.post('/:id',(req, res) => {
    
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
});

router.delete('/:id',async(req,res)=> {
    try{
        const Tasks = await Task.findById(req.params.id) 
        
        const a1 = await Tasks.remove()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})






module.exports = router