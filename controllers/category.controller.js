import Category from "../models/category.model.js";

async function findAll(req, res) {
    try {
        let cagetory = await Category.findAll();
        res.status(200).send(cagetory);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};

async function findOne(req, res) {
    try {
        let id = req.params.id
        let category = await Category.findByPk({where:{id}});
        if(category == 0){
            return res.status(404).send({data:"not found data"})
        };
        res.status(200).send(category);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};


async function findBySearch(req, res) {
    try {
      let query = req.query;
      let keys = Object.keys(query);
      let values = Object.values(query);
      let newQuery = {};
      values.forEach((val, index) => {
        if (val) {
          newQuery[keys[index]] = val;
        }
      });
  
      let category = await Category.findAll({
        where: newQuery
      });
      res.status(200).send({ data: category });
    } catch (error) {
      console.log(error.message);
    }
};

async function create(req, res) {
    try {

        let created = await Category.create(req.body);

        res.status(201).send({data:created})
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};

async function update(req, res) {
    try {
        let {id} = req.params;
        let data = req.body

        let result = await Category.update(data, {where:{id}})
        if(result == 0){
            return res.status(404).send({data:"not found data"})
        };
        res.send(result);

    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};

async function remove(req, res) {
    try {
        const { id } = req.params;

        const deletedData = await Category.destroy({ where: { id } });
        if(deletedData == 0){
           return  res.status(404).send({data:"not found data"})
        };
        res.status(200).send({data:"deleted data"})
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};

export{findAll, findOne,findBySearch, create, update, remove}