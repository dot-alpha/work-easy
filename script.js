window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('loginPage').classList.remove('hidden');
    }, 2000);
});

const cursorCircle = document.createElement('div');
cursorCircle.id = 'cursorCircle';
document.body.appendChild(cursorCircle);

document.addEventListener('mousemove', (e) => {
    cursorCircle.style.left = `${e.pageX - 10}px`;
    cursorCircle.style.top = `${e.pageY - 10}px`;
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('تم تسجيل الدخول!');
});

document.getElementById('registerUserForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    alert(`تم إرسال رابط التحقق إلى ${email}.`);
});

function showRegister() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    alert(`مرحبًا ${profile.getName()}! لقد سجلت الدخول باستخدام Google.`);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
}