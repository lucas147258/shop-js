const currentPath = window.location.pathname;
const form  = document.querySelector('#formAction');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(currentPath.split('/')[3] === 'login'){
        const email = form['username'].value;
        const password = form['password'].value;
        if(email && password){
            const user = {
                email: email,
                password: password
            }
            const session = sessionStorage.getItem('user');
            const userSession = JSON.parse(session);
            if(userSession){
                if(user.email === userSession.email && user.password === userSession.password){
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = '/';
                } else {
                    alert('Invalid email or password');
                }
            }
          
        }
    }else{
        const email = form['username'].value;
        const password = form['password'].value;
        const confirmPassword = form['password2'].value;

        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        if(email && password && confirmPassword){
            if(password === confirmPassword){
                const user = {
                    email: email,
                    password: password
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = 'pages/authenticate/login/index.html';
            }else{
                alert('Password does not match');
            }
        }
        
    }


    
});
