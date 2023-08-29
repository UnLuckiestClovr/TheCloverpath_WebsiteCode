var dal = require('../dal/Mongo_CRUD')

class User {
    constructor(username, password, email, u_name, age) {
        this.username = username
        this.password = password
        this.email = email
        this.u_name = u_name
        this.age = age
    }
}

async function getUser(userData) {
    const jsonData = dal.READ(userData.username)
    return new User(jsonData['username'], jsonData['password'], jsonData['email'], jsonData['u_name'], jsonData['age'])
}

async function createUser(userData) {
    const boolName = validateUsername(userData.username)
    const boolPswrd = validatePassword(userData.password)
    if(boolName == true && boolPswrd == true) {
        await dal.CREATE(userData.username, userData.email, userData.u_name, userData.u_age)
        await hashPasswordThenStore(userData.username, userData.password)
    }
    if(boolName == false) {
        console.log("Username is not Valid")
    }
    if(boolPswrd == false){
        console.log("Password is not Valid")
    }
}

async function updateUser(userData) {
    dal.UPDATE(userData)
}

async function hashPasswordThenStore(username, plainPswrd) {
    await dal.StoreHash(username, plainPswrd)
}

async function login(loginData) {
    const valid = await dal.LOGIN(loginData.username, loginData.password)
    switch(valid) {
        case "LOGIN VALID":
            
            break
        case "Password not Valid":
            break
        case "Username Not Valid":
            break
    }
}

async function LOGIN_VALID() {

}

async function validateUsername(username) {
    const taken = dal.validUsername(username)
    if(!taken) {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).+$")
        return regex.test(username)
    }
    else {return false}
}

async function validatePassword(password) {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[_)(+=!@#$%^&*]).+$")
    return regex.test(password)
}


module.exports = {
    User: User,
    u_CREATE: createUser,
    u_GET: getUser,
    u_UPDATE: updateUser,
    u_Login: login
}