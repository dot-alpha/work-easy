// لا حاجة لاستيراد Firebase هنا لأنه تم تهيئته في index.html

// الوصول إلى الكائنات من الـ window
const auth = window.firebaseAuth;
const db = window.firestoreDb;

// إخفاء شاشة التحميل
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('loginPage').classList.remove('hidden');
    }, 2000);
});

// الدائرة المتحركة
const cursorCircle = document.createElement('div');
cursorCircle.id = 'cursorCircle';
document.body.appendChild(cursorCircle);

document.addEventListener('mousemove', (e) => {
    cursorCircle.style.left = `${e.pageX - 10}px`;
    cursorCircle.style.top = `${e.pageY - 10}px`;
});

// تسجيل الدخول العادي
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('تم تسجيل الدخول بنجاح!');
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
});

// تسجيل مستخدم جديد وحفظ البيانات في Firestore
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
            alert('تم التسجيل بنجاح!');
            showLogin();
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
});

// تسجيل الدخول بـ Google وحفظ البيانات
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
            alert(`مرحبًا ${profile.getName()}!`);
        })
        .catch((error) => {
            alert('خطأ: ' + error.message);
        });
}

// التبديل بين الصفحات
function showRegister() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}