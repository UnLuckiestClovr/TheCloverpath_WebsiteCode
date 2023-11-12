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

try {
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
        const q1Ans = await document.getElementById('question1').value
        const q2Ans = await document.getElementById('question2').value
        const q3Ans = await document.getElementById('question3').value

        if(uName === "" || uPswrd === "" || uEmail === "" || uFullName === "" || uAge === "") {
            questionsInvalid.innerHTML = "<p> Profile Inputs cannot be Empty. </p>"
            return
        }
        if(q1Ans === "" || q2Ans === "" || q3Ans === "") {
            invalidQuestionaire(q1Ans, q2Ans, q3Ans)
            return
        }
        questionsInvalid.innerHTML = ""

        let intAge = parseInt(uAge)

        const newUser = {
            username: uName,
            password: uPswrd,
            email: uEmail,
            u_name: uFullName,
            u_age: intAge,
            q1Ans: q1Ans,
            q2Ans: q2Ans,
            q3Ans: q3Ans
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
                window.location.href = "/login"
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
} catch (error) {}


// - - - - - - Questionaire Script - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const questionsInvalid = document.getElementById('questionInvalidOutput')

subQuestionAnswersBTN.addEventListener('click', function () {
    const q1 = document.getElementById('question1')
    const q2 = document.getElementById('question2')
    const q3 = document.getElementById('question3')

    if(q1.value === "" || q2.value === "" || q3.value === "") {
        invalidQuestionaire(q1.value, q2.value, q3.value)
        return
    }
    questionsInvalid.innerHTML = ""

    username = 

    const questionAnswers = {

    }

    try{
        const response = await fetch('/users/updatequestionaire', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionAnswers)
        })
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

try {

    document.getElementById('SubmitQuestionaire').addEventListener('click', async() => {
        console.log("Update Submitted")

        const q1 = document.getElementById('question1')
        const q2 = document.getElementById('question2')
        const q3 = document.getElementById('question3')

        if(q1.value === "" && q2.value === "" && q3.value === "") {
            console.log("No Values Inputted")
            return
        }
        questionsInvalid.innerHTML = ""

        const questionAnswers = {
            q1Ans: q1.value,
            q2Ans: q2.value,
            q3Ans: q3.value
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
                console.log("Info Updated")
                window.location.href = "/profile"
            } else {
                console.log("Issue within DAL")
            }
        } catch (error) {
            console.log(error)
            console.log("Error Updating Info")
        }
    })
} catch (error) {}


// - - - - - - - - - Chart Script - - - - - - - - - -

async function getCharts() {
    const ctx1 = document.getElementById('quest1Chart')
    const ctx2 = document.getElementById('quest2Chart')
    const ctx3 = document.getElementById('quest3Chart')

    try{
        const response = await fetch('/api/q1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json();

        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Coffee', 'Tea', 'Hot Cocoa', 'None'],
                datasets: [{
                    label: 'Coffee, Tea, or Hot Cocoa?',
                    data: [responseData.Ans1, responseData.Ans2, responseData.Ans3, responseData.Ans4],
                    borderWidth: 1
                }]
            }
        })
    } catch (error) {console.log("Chart 1 Error")}
        
    try{
        const response = await fetch('/api/q2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json();

        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Vanilla', 'Chocolate', 'Strawberry', 'Neopolitan', 'Other'],
                datasets: [{
                    label: 'What is your Favorite Flavour of Ice Cream?',
                    data: [responseData.Ans1, responseData.Ans2, responseData.Ans3, responseData.Ans4, responseData.Ans5],
                    borderWidth: 1
                }]
            }
        })
    } catch (error) {console.log("Chart 2 Error")}

    try{
        const response = await fetch('/api/q3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json();

        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Violet'],
                datasets: [{
                    label: 'What is your Favorite Color out of Those Listed?',
                    data: [responseData.Ans1, responseData.Ans2, responseData.Ans3, responseData.Ans4, responseData.Ans5, responseData.Ans6, responseData.Ans7],
                    borderWidth: 1
                }]
            }
        })
    } catch (error) {console.log("Chart 3 Error")}
}

try {
    getCharts()
} catch (error) {}

try {
    document.getElementById('LogoutBTN').addEventListener('click', async function() {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok) {
            console.log("Logged Out")
            window.location.href = "/LoginorRegister"
        } else {
            console.log("Issue within Logout")
        }
    })


} catch (error) {}