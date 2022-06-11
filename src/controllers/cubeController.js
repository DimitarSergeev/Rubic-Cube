const router = require('express').Router();

const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;

    
    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }

    
    try {
        await cubeService.create(cube);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOneDetails(req.params.id).lean();

    res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();
    
    res.render('accessory/attach', {cube, accessories}); 
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const accessoryId = req.body.accessory;

    await cubeService.attachAccessory(req.params.cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
})
router.get('/:cubeId/edit',async (req,res)=>{
    const cube = await cubeService.getOne(req.params.cubeId).lean()

    res.render('cube/edit', {cube})
})
router.post('/:cubeId/edit',async (req,res)=>{
  const modifyCube = await cubeService.edit(req.params.cubeId,req.body)     

  res.redirect(`/cube/details/${modifyCube._id}`)  
})
router.get('/:cubeId/delete',async (req,res)=>{
    const cube = await cubeService.getOne(req.params.cubeId).lean()

    res.render('cube/delete', {cube})
})
router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.params.cubeId)

    res.redirect('/')
})

module.exports = router;
