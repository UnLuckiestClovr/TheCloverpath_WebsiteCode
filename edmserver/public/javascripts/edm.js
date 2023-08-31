// - - - - - - - - - - - - - - - Login Scripts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const loginRegTab = document.getElementById('userLoginOrReg')
const profileTab = document.getElementById('userProfile')

// const user = fetch('/users', {
//     method: "GET",
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(response.body)
// })

const outputTextBox = document.getElementById('OutputBox')

async function LoginInvalid() {
    outputTextBox.innerHTML = "Login Unsuccessful: Username or Password Incorrect"
}

// - - - - - - - - - - - - - - - - - - - - RegLogin Page Scripts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var relativeUsername = ""

document.getElementById('loginBTN').addEventListener('click', async () => {
    const uName = await document.getElementById('uLogin').value
    const uPswrd = await document.getElementById('pLogin').value

    console.log("User Input: ", {uName, uPswrd})

    if(uName === "" || uPswrd === "") {
        console.log('Inputs cannot be Empty')
        return
    }
    console.log("Inputs were Filled")

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
            console.log("Login Successful")
            relativeUsername = uName
            window.location.href = "/Profile"
        } else {
            LoginInvalid()
            console.log("Login Failure")
        }
    } catch (error) {
        //console.log(error)
    }
})

document.getElementById('registerBTN').addEventListener('click', async() => {
    const uName = await document.getElementById('uReg').value
    const uPswrd = await document.getElementById('pReg').value
    const uEmail = await document.getElementById('eReg').value
    const uFullName = await document.getElementById('nReg').value
    const uAge = await document.getElementById('aReg').value

    if(uName === "" || uPswrd === "" || uEmail === "") {
        console.log('Inputs cannot be Empty')
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
            relativeUsername = uName
            window.location.href = "/questionaire"
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

// - - - - - - Questionaire Script - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const subQuestionAnswersBTN = document.getElementById('SubmitQuestionaire')
const questionsInvalid = document.getElementById('questionInvalidOutput')

subQuestionAnswersBTN.addEventListener('click', async function () {
    const q1 = document.getElementById('question1')
    const q2 = document.getElementById('question2')
    const q3 = document.getElementById('question3')

    if(q1.value === "" || q2.value === "" || q3.value === "") {
        invalidQuestionaire(q1.value, q2.value, q3.value)
        return
    }
    questionsInvalid.innerHTML = ""

    const questionAnswers = {
        username: relativeUsername,
        qAns1: q1.value,
        qAns2: q2.value,
        qAns3: q3.value
    }

    try{
        const response = await fetch('/users/updatequestionaire', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionAnswers)
        })
        if(response.ok) {
            relativeUsername = ""
        }
    } catch (error) {
        console.log(error)
    }
})

function invalidQuestionaire(ans1, ans2, ans3) {
    let textVar = "<article style='color: red'>"
    if(ans1 === "") {
        textVar += "<p> Question 1 Requires Input </p>"
    }
    if(ans2 === "") {
        textVar += "<p> Question 2 Requires Input </p>"
    }
    if(ans3 === "") {
        textVar += "<p> Question 3 Requires Input </p>"
    }
    textVar += "</article>"
    questionsInvalid.innerHTML = textVar
}