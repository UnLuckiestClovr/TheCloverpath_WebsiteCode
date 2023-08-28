const { MongoClient } = require('mongodb')
const connURL = 'mongodb+srv://GeneralUser:vJgb6F8MXNRFpk2i@thecloverpatchwebdataba.tw6rwur.mongodb.net/?retryWrites=true&w=majority'
const MainBranch_DTBName = 'TheCloverpatch_MainBranch'
const collNames = ["UserInfo", "pswrdStorage", "productCafeOrderList"]
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const bcrypt = require('bcrypt')
const saltRounds = 10

const client = new MongoClient(connURL, options)

const initDatabase = async () => {
    try {
        await client.connect()
        const db = client.db(MainBranch_DTBName)

        collNames.forEach(async (collection) => {
            const collectionExists = await db.listCollections({name: collection}).hasNext()
            if(collectionExists) { console.log("Collection Exists: ", collection) }
        })

        await client.close()
    } catch (error) {
        console.log("Error Initializing the Database")
    }
}

async function readUser (inputUsername) {
    try{
        await client.connect()

        const db = client.db(MainBranch_DTBName)
        const coll = db.collection(collNames[0])
        const personOBJ = (await coll.find({username: inputUsername}).toArray()).at(0)

        await client.close()

        const jsonData = JSON(personOBJ)

        return jsonData
    } catch (error) { console.log(error) }
}

async function createUser(username, email, name, age) {
    try {
        await client.connect()
        const db = client.db(MainBranch_DTBName)
        const coll = db.collection(collNames[0])
        console.log("Collection Found Succesfully")

        const highestIdDocument = await coll.findOne({}, { sort: { _id: -1 } });
        const highestId = highestIdDocument ? highestIdDocument._id : 0;

        let id = 1
        for (let i = 1; i <= highestId + 1; i++) {
            const existingDoc = await coll.findOne({ _id: i });
            if (!existingDoc) {
                id = i;
                break;
            }
        }

        let finalJSON = {
            "_id": id,
            "username": username,
            "email": email,
            "name": name,
            "age": age
        }

        await coll.insertOne(finalJSON)

        await client.close()
    } catch (error) {
        console.log(error)
    }
}

async function updateUser() {

}

// - - - Hashing Utils - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function hashPassword(username, plainTextPswrd) {
    try {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(plainTextPswrd, salt, function(err, hash) {
                createNewPasswordBlock(username, hash)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

async function createNewPasswordBlock(username, hashedPSWRD) {
    try {
        await client.connect()

        const db = client.db(MainBranch_DTBName)
        const coll = db.collection(collNames[1])
        console.log("Collection Found Succesfully")

        const highestIdDocument = await coll.findOne({}, { sort: { _id: -1 } });
        const highestId = highestIdDocument ? highestIdDocument._id : 0;

        let id = 1
        for (let i = 1; i <= highestId + 1; i++) {
            const existingDoc = await coll.findOne({ _id: i });
            if (!existingDoc) {
                id = i;
                break;
            }
        }

        const json = {
            "_id": id,
            "username": username,
            "encryptedPswrd": hashedPSWRD
        }

        await coll.insertOne(json)

        await client.close()
    } catch (error) {
        console.log(error)
    }
}

// - - - Validation for Login - - -

async function loginValidation(username, plainTextPswrd) {
    const validUsername = loginUsernameCheck(username)
    if (validUsername == true) {
        const validPSWRD = validatePassword(username, plainTextPswrd)
        if(validPSWRD == true) {
            return "LOGIN VALID"
        }
        else {
            return "Password not Valid"
        }
    }
    else{
        return "Username Not Valid"
    }
}

async function loginUsernameCheck(username) {
    try {
        await client.connect()

        const db = client.db(MainBranch_DTBName)
        const coll = db.collection(collNames[0])

        const doc = coll.findOne({username: username})

        await client.close()

        return (doc != null && doc != undefined)
    } catch (error) {
        console.log(error)
    }
}

async function validatePassword(username, pswrd) {
    try {
        await client.connect()

        const db = client.db(MainBranch_DTBName)
        const coll = db.collection(collNames[1])

        const personOBJ = (await coll.find({username: username}).toArray()).at(0)
        const match = await bcrypt.compare(pswrd, personOBJ.encryptedPswrd)

        await client.close()

        return match
    } catch (error) {
        console.log(error)
        return false
    }
    
}


module.exports = {
    READ: readUser,
    CREATE: createUser,
    UPDATE: updateUser,
    StoreHash: hashPassword,
    ValidPSWRD: validatePassword,
    LOGIN: loginValidation
}