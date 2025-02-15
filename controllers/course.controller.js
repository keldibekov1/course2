import Course from "../models/course.model.js";

async function findAll(req, res) {
    try {
        let courses = await Course.findAll();
        res.status(200).send(courses);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
        
    }
};

async function findOne(req, res) {
    try {
        let id = req.params.id
        let course = await Course.findByPk({where:{id}});
        if(course == 0){
            return res.status(404).send({data:"not found data"})
        };
        res.status(200).send(course);
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
  
      let course = await Course.findAll({
        where: newQuery
      });
      res.status(200).send({ data: course });
    } catch (error) {
      console.log(error.message);
    }
};

async function create(req, res) {
    try {

        let created = await Course.create(req.body);

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

        let result = await Course.update(data, {where:{id}})
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

        const deletedData = await Course.destroy({ where: { id } });
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