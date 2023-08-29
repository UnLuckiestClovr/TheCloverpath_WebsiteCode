// - - - - - - - - - - - - - - - Login Scripts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const loginRegTab = document.getElementById('userLoginOrReg')
const profileTab = document.getElementById('userProfile')

function switchTabtoProfile() {
    loginRegTab.style.display = 'none';
    profileTab.style.display = 'block';
}

function switchTabtoLogReg() {
    loginRegTab.style.display = 'none';
    profileTab.style.display = 'block';
}

async function LOGINVALID() {
    switchTabtoProfile()
}

async function LOGGEDOUT() {
    switchTabtoLogReg()
}

// - - - - - - - - - - - - - - - - - - - - RegLogin Page Scripts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
document.getElementById('loginBTN').addEventListener('click', async () => {
    const uName = document.getElementById('uLogin').value
    const uPswrd = document.getElementById('pLogin').value

    if(uName === "" || uPswrd === "") {
        return
    }

    const newUser = {
        username: uName,
        password: uPswrd
    }

    try {
        const response = await fetch('/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if(response.ok) {
            LOGINVALID()
            const responseData = await response.json()
            console.log(responseData.message)
        } else {
            console.log("Login Failure")
        }
    } catch (error) {
        console.log(error)
    }
})

document.getElementById('registerBTN').addEventListener('click', async() => {
    const uName = document.getElementById('uReg').value
    const uPswrd = document.getElementById('pReg').value
    const uEmail = document.getElementById('eReg').value
    const uFullName = document.getElementById('nReg').value
    const uAge = document.getElementById('aReg').value

    if(uName === "" || uPswrd === "" || uEmail === "") {
        return
    }

    let intAge = parseInt(uAge)

    const newUser = {
        username: uName,
        password: uPswrd,
        email: uEmail,
        u_name: uFullName,
        u_age: intAge
    }

    try {
        const response = await fetch('/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        if(response.ok) {
            const responseData = await response.json()
            console.log(responseData.message)
        } else {
            console.log("Registry Failure")
        }
    } catch (error) {
        console.log(error)
    }
})


const LoginView = document.getElementById('LoginView')
const RegisterView = document.getElementById('RegisterView')
const RegSwitch = document.getElementById('regViewSwitch')
const LoginSwitch = document.getElementById('logViewSwitch')

LoginSwitch.addEventListener('click', function () {
    changeViewtoLogin()
})

RegSwitch.addEventListener('click', function () {
    changeViewtoRegister()
})

function changeViewtoLogin() {
    LoginView.style.display = "block"
    RegisterView.style.display = "none"
}

function changeViewtoRegister() {
    RegisterView.style.display = "block"
    LoginView.style.display = "none"
}