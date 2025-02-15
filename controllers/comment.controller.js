import Comment from "../models/comment.model.js";

async function FindAll(req, res) {
    try {
        let all = await Comment.findAll()
        res.status(201).send({data: all}) 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

async function FindOne(req, res) {
    try {
        let {id} = req.params;
        let one = await Comment.findByPk(id)
        res.status(201).send({data: one}) 
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

async function Create(req, res) {
    try {
        let created = await Comment.create(req.body)
        res.status(201).send({data: created})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

async function Update(req, res) {
    try {
        let {id} = req.params;
        let data = req.body

        let result = await Comment.update(data, {where:{id}})
        if(result == 0){
            return res.status(404).send({data:"not found data"})
        };
        res.status(200).send(result)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

async function Remove(req, res) {
    try {
        const { id } = req.params;  

        let result = await Comment.destroy({ where: { id } });
        if(result == 0){
            return  res.status(404).send({data:"not found data"})
        };
        res.status(200).send({data:"deleted data"})
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
}

export {FindAll, Update, Remove, Create, FindOne}