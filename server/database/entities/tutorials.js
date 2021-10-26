const mysql = require('mysql2/promise');
const {mysqlConfig} = require('../../../config');

//All tutorials
exports.allTutorials = async () => {
    console.log('All tutorials!');
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
        `
        SELECT id, user_id,title,content,
        CASE 
        WHEN private ='0' THEN 'Public' 
        WHEN private ='1' THEN 'Private'
        END AS private FROM tutorials      
        `    
    );
    await con.end();
    return result
};

//Public tutorials
 exports.publicTutorials = async () => {
    //console.log('Only Public Tutorials');
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
        `
        SELECT id, user_id,title,content,
        CASE 
        WHEN private ='0' THEN 'Public' 
        WHEN private ='1' THEN 'Private'
        END AS private FROM tutorials
        WHERE private = 0
        `    
    );
    await con.end();
    return result
}; 

// User Tutorials
exports.viewUserTutorials = async (id) => {    
    console.log('Only User Tutorials');
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
        `
        SELECT *
        FROM tutorials
        WHERE user_id = ?  
        `,
        [id]
    );
    await con.end();
    return result
}; 

// Create User Tutorial
exports.createUserTutorial = async (email,title, content, private) => {
    //console.log('Create User Tutorial');
    const id = await emailToId(email);
    //const {title, content, private} = body;
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(
        `
        INSERT INTO tutorials SET
        user_id = ?, title = ?, content = ?, private = ?
        `,
        [id, title, content, private]
    );
    await con.end();
    return result
}

const emailToId= async (email) => {
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(`SELECT id FROM users WHERE email = '${email}'`);
    await con.end();
    return Object.values(result[0])[0]
}

exports.getUserId= async (email) => {
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(`SELECT id FROM users WHERE email = '${email}'`);
    await con.end();
    return Object.values(result[0])[0]
}

// Open Tutorial
exports.openTutorial = async (id) => {
    const con = await mysql.createConnection(mysqlConfig);
    const [result] = await con.execute(`SELECT * FROM tutorials WHERE id =${id}`);
    await con.end()
    if (result[0].private == 0) {
        result[0].private = 'Public';
    } else {
    result[0].private = 'Private'  
    }    
    return result
}
