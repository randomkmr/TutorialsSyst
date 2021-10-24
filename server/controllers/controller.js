const usersEntity = require('../../server/database/entities/users');
const tutorialsEntity = require('../../server/database/entities/tutorials');

// Auth login
exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const token = await usersEntity.loginUser(email, password);

        res.cookie('authtoken', token, { httpOnly: true, secure: true, maxAge: 90000 });
        res.status(200).json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}

// Auth register
exports.register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await usersEntity.registerUser(email, password);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }    
}

// Auth countUsers
exports.countUsers = async (req, res) => {
    try {
        const data = await usersEntity.countUsers();
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }    
}

// Tutorials userTutorials
exports.userTutorials = async (req, res) => {
    try {
        const data = await tutorialsEntity.viewUserTutorials(req.params.id);
        res.status(200).json(data);
    }catch (error) {
        console.log(error);
        res.status(500).json({error});
    }    
}

// Tutorials createTutorial
exports.createTutorial = async (req,res) => { 
    try {
        const data = await tutorialsEntity.createUserTutorial(req.user.email,req.body);
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    } 
}

// Tutorials viewTutorials
exports.viewTutorials = async (req, res) => {       
    try {
        const data = await (req.user ? tutorialsEntity.allTutorials() : tutorialsEntity.publicTutorials());
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});        
    }
    
}
