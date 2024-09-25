var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var signBtn;
var inputReq = document.getElementById('inputReq');
var valdNam = document.getElementById('valdNam');
var valdEml = document.getElementById('valdEml');
var valdPass = document.getElementById('valdPass');
var sucsess = document.getElementById('sucsess');
var emailExis = document.getElementById('emailExis');
var arr;
var valName = /^\w{3,}(\s+\w+)*$/
var valEmail = /^[a-zA-Z0-9_]+@gmail+\.com$/
var valPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
var name1, email1, pass1;
if(localStorage.getItem('users') == null){
    arr = [];
}else{
    arr = JSON.parse(localStorage.getItem('users'));
}
function signupUser(){
    var data = {
        name : userName.value,
        email : userEmail.value,
        pass : userPassword.value,
    }
    arr.push(data);
    localStorage.setItem('users' , JSON.stringify(arr));
}

function validation() {
    var check = true;
    name1 = email1 = pass1 =  true;
    if (!valName.test(userName.value)) {
        check = false;
        name1 = false;
    }
    if (!valEmail.test(userEmail.value)) {
        check = false;
        email1 = false;
    }
    if (!valPass.test(userPassword.value)) {
        check = false;
        pass1 = false;
    }
    return check;
}

function validInput(input, val) {
    if (val.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}

signBtn = document.getElementById('signUp');
if(signBtn){
    signBtn.addEventListener('click' , function(){
        signup();
    });
}else{
    signBtn = null;
}
function signup(){
    if(checkEmail()){
        emailExis.classList.remove('d-none');
    }else{
        emailExis.classList.add('d-none');
        if(validation()){
            inputReq.classList.add('d-none');
            valdNam.classList.add('d-none');
            valdEml.classList.add('d-none');
            valdPass.classList.add('d-none');
            sucsess.classList.remove('d-none');
            signupUser();
            console.log(arr);
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 500);
        }else{
          if(!name1){
            valdNam.classList.remove('d-none');
          }  
          if(!email1){
            valdEml.classList.remove('d-none');
          }  
          if(!pass1){
            valdPass.classList.remove('d-none');
        }
            inputReq.classList.remove('d-none');
    }
    }
}

function checkEmail(){
    var ch = false;
    for(var i = 0; i < arr.length; ++i){
        if(userEmail.value == arr[i].email){
           ch = true;
        }
    }
    return ch;
}

if(userName){
    userName.addEventListener('input' , function(){
        validInput(userName, valName);
    });
}else{
    userName = null;
}
if(userEmail){
    userEmail.addEventListener('input' , function(){
        validInput(userEmail, valEmail);
});
}else{
    userEmail = null;
}
if(userPassword){
    userPassword.addEventListener('input' , function(){
        validInput(userPassword, valPass);
});
}else{
    userPassword = null;
}
console.log(arr);

var signinEmail = document.getElementById('signinEmail');
var signinpassword = document.getElementById('signinpassword');
var emptyInput = document.getElementById('emptyInput');
var incorrect = document.getElementById('incorrect');
var logBtn = document.getElementById('Login');
if(logBtn){
    logBtn.addEventListener('click' , function(){
        check();
    })
}else{
    logBtn = null;
}
function check(){
    var nameUser = '';
    var checkVal = false;
    for (var i = 0; i < arr.length; i++) {
        if(arr[i].email == signinEmail.value && arr[i].pass == signinpassword.value){
            checkVal = true;
            nameUser = `
            <h1>Welcome ${arr[i].name}</h1>
            `;
            localStorage.setItem('userName' , nameUser);
            break;
        }
    }
    if(checkVal){
        window.location.href = 'home.html';
        incorrect.classList.add('d-none');
        emptyInput.classList.add('d-none');
    }else{
        if(signinEmail.value == '' || signinpassword.value == ''){
            incorrect.classList.add('d-none');
            emptyInput.classList.remove('d-none');
        }else{
            incorrect.classList.remove('d-none');
            emptyInput.classList.add('d-none');
        }
    }
}
var welcome = document.getElementById('welcome');
if(localStorage.getItem('userName')!= null){
    welcome.innerHTML = localStorage.getItem('userName');
}