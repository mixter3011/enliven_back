const Child = require("../models/Child");
const Parent = require("../models/Parent");

const userController = {
    getSingleUser: async(req, res) => {
        const id = req.params.id;

        const parent = await Parent.findById(id);
        if(!parent) return res.status(400).json("User does not exist");

        return res.status(200).json(parent);
    },
    getChildrenOfParent: async(req, res) => {
        const id = req.params.id;

        const parent = await Parent.findById(id);
        if(!parent) return res.status(400).json("user does not exist");

        if(parent.children.length < 2) return res.status(200).json(parent.children);

        let childDetails = [];
        parent.children.map(async(child) => {
            let currentChild = await Child.findById(child);    
            childDetails.push({
                name: currentChild.name,
                self_esteem: currentChild.self_esteem || 0,
                general_knowledge: currentChild.general_knowledge || 0
            })
        })

        return res.status(200).json(childDetails);
    },
    getChildDetails: async(req, res) => {
        const {id} = req.params.id;
        const {name, score} = req.body;

        if(!id || !name) return res.status(400).json("fill all");

        const parent = await Parent.findById(id);
        if(!parent) return res.status(404).json("not found");

        const required_child = {};

        if(parent.children.length > 0){
            parent.children.map(async(child) => {
                const childData = await Child.findById(child);
                if(childData.name === name) {
                    required_child = {
                        name: childData.name,
                        self_esteem: childData.score,
                        general_knowledge,
                        age
                    }
                }
            })
        }

        return res.status(200).json(required_child);

    },
    createChild: async(req, res) => {
        const {id} = req.params.id;

        const {name, age} = req.body;

        const parent = await Parent.findOne({id});
        if(!parent) return res.status(400).json("404 Error : Not found"); 

        if(!name || !age) return res.status(400).json("please enter the fields");

        const newChild = new Child({
            name,
            self_esteem: 0,
            general_knowledge: 0,
            age
        })

        await newChild.save();

        return res.status(200).json(newChild);
    }
}

module.exports = userController;