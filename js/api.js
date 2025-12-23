// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function để lấy token từ localStorage
function getAuthToken() {
  return localStorage.getItem('token');
}

// Helper function để tạo headers với token
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
  };
}

// ==================== AUTH API ====================

// Đăng ký
async function register(username, password, fullName, email, role = 'NhanVien') {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, fullName, email, role })
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Đăng nhập
async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    
    if (data.success) {
      // Lưu token và thông tin user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Đăng xuất
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

// Lấy thông tin user hiện tại
async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thông tin user:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// ==================== MEDICINES API ====================

// Lấy tất cả thuốc
async function getAllMedicines() {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy danh sách thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy thuốc theo ID
async function getMedicineById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thông tin thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Tìm kiếm thuốc
async function searchMedicines(keyword) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/search?keyword=${keyword}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi tìm kiếm thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Thêm thuốc mới
async function createMedicine(medicineData) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(medicineData)
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi thêm thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Cập nhật thuốc
async function updateMedicine(id, medicineData) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(medicineData)
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi cập nhật thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Cập nhật tồn kho
async function updateMedicineStock(id, quantity) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}/stock`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity })
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi cập nhật tồn kho:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Xóa thuốc
async function deleteMedicine(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi xóa thuốc:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy thuốc sắp hết
async function getLowStockMedicines(threshold = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/low-stock?threshold=${threshold}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thuốc sắp hết:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// ==================== CUSTOMERS API ====================

// Lấy tất cả khách hàng
async function getAllCustomers() {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy danh sách khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy khách hàng theo ID
async function getCustomerById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thông tin khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Tìm kiếm khách hàng
async function searchCustomers(keyword) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/search?keyword=${keyword}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi tìm kiếm khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Thêm khách hàng mới
async function createCustomer(customerData) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData)
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi thêm khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Cập nhật khách hàng
async function updateCustomer(id, customerData) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData)
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi cập nhật khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Xóa khách hàng
async function deleteCustomer(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi xóa khách hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy khách hàng VIP
async function getVIPCustomers() {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/vip`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy khách hàng VIP:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// ==================== ORDERS API ====================

// Lấy tất cả đơn hàng
async function getAllOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy danh sách đơn hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy đơn hàng theo ID
async function getOrderById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thông tin đơn hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy đơn hàng theo ngày
async function getOrdersByDate(date) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/by-date?date=${date}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy đơn hàng theo ngày:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy thống kê doanh thu
async function getRevenue(date) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/revenue?date=${date}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy thống kê doanh thu:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Lấy sản phẩm bán chạy
async function getTopProducts(limit = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/top-products?limit=${limit}`, {
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi lấy sản phẩm bán chạy:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Tạo đơn hàng mới
async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData)
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// Xóa đơn hàng
async function deleteOrder(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await response.json();
  } catch (error) {
    console.error('Lỗi xóa đơn hàng:', error);
    return { success: false, message: 'Lỗi kết nối server' };
  }
}

// ==================== UTILITY FUNCTIONS ====================

// Kiểm tra user đã đăng nhập chưa
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Redirect về login nếu chưa đăng nhập
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
  }
}

// Lấy thông tin user từ localStorage
function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Format số tiền VNĐ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Format ngày
function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN');
}

// ==================== EXAMPLE USAGE ====================

/*
// Trong trang login.html

async function handleLogin() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  const result = await login(username, password);
  
  if (result.success) {
    alert('Đăng nhập thành công!');
    window.location.href = 'dashboard.html';
  } else {
    alert(result.message);
  }
}

// Trong trang khohang.html

async function loadMedicines() {
  const result = await getAllMedicines();
  
  if (result.success) {
    // Hiển thị danh sách thuốc
    displayMedicines(result.data);
  } else {
    alert(result.message);
  }
}

// Trong trang banhang.html

async function createNewOrder() {
  const orderData = {
    totalAmount: 150000,
    customerId: 1,
    items: [
      { medId: 1, quantity: 2, unitPrice: 25000 },
      { medId: 2, quantity: 1, unitPrice: 100000 }
    ]
  };
  
  const result = await createOrder(orderData);
  
  if (result.success) {
    alert('Tạo đơn hàng thành công!');
  } else {
    alert(result.message);
  }
}
*/
