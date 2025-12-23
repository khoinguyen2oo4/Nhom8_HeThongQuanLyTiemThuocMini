// 1. CHỨC NĂNG ĐĂNG KÝ
async function handleRegister() {
    // Lấy dữ liệu từ ô nhập
    const user = document.getElementById('reg-user').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-pass').value;
    const rePass = document.getElementById('reg-repass').value;

    // Kiểm tra rỗng
    if (!user || !email || !pass || !rePass) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra mật khẩu khớp nhau
    if (pass !== rePass) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    try {
        // Gọi API backend để đăng ký
        const response = await register(user, pass, user, email);
        
        if (response.success) {
            alert("Đăng ký thành công! Hãy đăng nhập ngay.");
            // Chuyển tab sang Đăng nhập tự động
            switchTab('login');
        } else {
            alert("Lỗi đăng ký: " + response.message);
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        alert("Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy!");
    }
}

// 2. CHỨC NĂNG ĐĂNG NHẬP
async function handleLogin() {
    const user = document.getElementById('login-username').value.trim();
    const pass = document.getElementById('login-password').value;

    if (!user || !pass) {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu!");
        return;
    }

    try {
        // Gọi API backend để đăng nhập
        const response = await login(user, pass);
        
        if (response.success) {
            // Lưu token vào localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', user);
            
            alert("Đăng nhập thành công!");
            window.location.href = "dashboard.html";
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        alert("Không thể kết nối đến server!");
    }
}

// 3. ẨN/HIỆN MẬT KHẨU
function togglePass(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Giữ nguyên hàm chuyển Tab cũ của bạn (Nếu chưa có thì copy vào đây luôn)
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    if (tab === 'login') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('login-form').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('register-form').classList.add('active');
    }
}