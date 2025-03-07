const auth = window.firebaseAuth;
const db = window.firestoreDb;

// شاشة التحميل مع انتقال متحرك
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        loader.style.transform = 'scale(1.2)';
        setTimeout(() => {
            loader.style.display = 'none';
            const loginPage = document.getElementById('loginPage');
            loginPage.classList.remove('hidden');
            loginPage.style.opacity = '0';
            loginPage.style.transform = 'translateY(100px) scale(0.95)';
            setTimeout(() => {
                loginPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                loginPage.style.opacity = '1';
                loginPage.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, 800);
    }, 2500);
});

// تسجيل الدخول العادي
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            showDashboard(userCredential.user);
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
});

// تسجيل مستخدم جديد
document.getElementById('registerUserForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const age = formData.get('age');
    const email = formData.get('email');
    const password = formData.get('password');

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            showDashboard(auth.currentUser);
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
});

// تسجيل الدخول بـ Google
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(idToken);

    auth.signInWithCredential(credential)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                name: profile.getName(),
                email: profile.getEmail(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        })
        .then(() => {
            showDashboard(auth.currentUser);
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
}

// عرض صفحة الترحيب
function showDashboard(user) {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    const dashboard = document.getElementById('dashboard');
    dashboard.classList.remove('hidden');
    dashboard.style.opacity = '0';
    dashboard.style.transform = 'translateY(100px) scale(0.95)';
    setTimeout(() => {
        dashboard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dashboard.style.opacity = '1';
        dashboard.style.transform = 'translateY(0) scale(1)';
    }, 50);
    document.getElementById('welcomeMessage').textContent = `مرحبًا ${user.displayName || user.email}! استمتع بتجربة Work Easy الخارقة!`;
}

// تسجيل الخروج
function signOut() {
    auth.signOut().then(() => {
        const dashboard = document.getElementById('dashboard');
        dashboard.style.opacity = '0';
        dashboard.style.transform = 'translateY(100px) scale(0.95)';
        setTimeout(() => {
            dashboard.classList.add('hidden');
            const loginPage = document.getElementById('loginPage');
            loginPage.classList.remove('hidden');
            loginPage.style.opacity = '0';
            loginPage.style.transform = 'translateY(100px) scale(0.95)';
            setTimeout(() => {
                loginPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                loginPage.style.opacity = '1';
                loginPage.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, 800);
    });
}

// التنقل بين الصفحات
function showRegister() {
    const loginPage = document.getElementById('loginPage');
    loginPage.style.opacity = '0';
    loginPage.style.transform = 'translateY(100px) scale(0.95)';
    setTimeout(() => {
        loginPage.classList.add('hidden');
        const registerPage = document.getElementById('registerPage');
        registerPage.classList.remove('hidden');
        registerPage.style.opacity = '0';
        registerPage.style.transform = 'translateY(100px) scale(0.95)';
        setTimeout(() => {
            registerPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            registerPage.style.opacity = '1';
            registerPage.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }, 800);
}

function showLogin() {
    const registerPage = document.getElementById('registerPage');
    registerPage.style.opacity = '0';
    registerPage.style.transform = 'translateY(100px) scale(0.95)';
    setTimeout(() => {
        registerPage.classList.add('hidden');
        const loginPage = document.getElementById('loginPage');
        loginPage.classList.remove('hidden');
        loginPage.style.opacity = '0';
        loginPage.style.transform = 'translateY(100px) scale(0.95)';
        setTimeout(() => {
            loginPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            loginPage.style.opacity = '1';
            loginPage.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }, 800);
}