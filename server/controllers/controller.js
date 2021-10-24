const usersEntity = require('../../server/database/entities/users');
const tutorialsEntity = require('../../server/database/entities/tutorials');

// Auth login
exports.login = async (req,res) => {
    try {
        const {email, password} = req.body;
        const token = await usersEntity.loginUser(email, password);

        res.cookie('authtoken', token, { httpOnly: true, secure: true, maxAge: 90000 });
        //res.status(200).json(token);
        res.redirect('http://localhost:3000/tutorials');
        

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
        res.render('login-user', { alert: 'User registered successfully! Please Log in!'})
    } catch (error) {
        console.log(error);
        //res.status(500).json({error});
        res.render('register-user', { alert: 'Something wrong..!'})
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
        //res.status(200).json(data);
        const rows = data;
        const userId = req.params.id;
        res.render('home-loggedin', {rows, userId});
        //console.log(userId);
        
    }catch (error) {
        console.log(error);
        res.status(500).json({error});
    }    
}

// Tutorials createTutorial
exports.createTutorial = async (req,res) => { 
    try {
        const {title, content, private} = req.body;
        const data = await tutorialsEntity.createUserTutorial(req.user.email, title, content, (private == 'on' ? 1 : 0 ));
        res.render('add-tutorial', { alert: 'New Tutorial!'});
    } catch (error) {
        console.log(error);
        //res.status(500).json({error});
        res.render('add-tutorial', { alert: 'Error...'});
    } 
}

// Tutorials viewTutorials
exports.viewTutorials = async (req, res) => {       
    try {
        const userNumber = await usersEntity.countUsers();
        const data = await (req.user ? tutorialsEntity.allTutorials() : tutorialsEntity.publicTutorials());       
        const rows = data;
        const userId = await (req.user ? tutorialsEntity.getUserId(req.user.email) : "");  
        const userEmail = (req.user ? req.user.email : "");    
        (req.user ? res.render('home-loggedin', {rows, userId, userEmail, userNumber}) : res.render('home', {rows, userNumber}));
    } catch (error) {
        console.log(error);
        res.status(500).json({error});        
    }    
}

exports.viewTutorial = async (req, res) => {
    try {
        const data = await tutorialsEntity.openTutorial(req.params.id);
        res.render('view-tutorial', {data});
        //res.status(200).json(data);
    } catch {}
}

exports.loginGet = async (req, res) => {
    try {
        //const data = await tutorialsEntity.openTutorial(req.params.id);
        res.render('login-user');
        //res.status(200).json(data);
    } catch {}
}

exports.registerGet = async (req, res) => {
    try {
        res.render('register-user');
    } catch {}
}