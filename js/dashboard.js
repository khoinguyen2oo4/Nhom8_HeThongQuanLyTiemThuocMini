// Vẽ biểu đồ ngay khi web chạy
document.addEventListener("DOMContentLoaded", function () {
    
    // 1. BIỂU ĐỒ DOANH THU (Đường cong)
    const ctxDoanhThu = document.getElementById('chartDoanhThu').getContext('2d');
    new Chart(ctxDoanhThu, {
        type: 'line',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [{
                label: 'Doanh thu',
                data: [500, 1200, 900, 1500, 2000, 1800], // Số liệu giả
                borderColor: '#00d2d3',
                backgroundColor: 'rgba(0, 210, 211, 0.2)',
                fill: true,
                tension: 0.4 // Tạo đường cong mềm mại
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 2. BIỂU ĐỒ ĐƠN HÀNG (Cột)
    const ctxDonHang = document.getElementById('chartDonHang').getContext('2d');
    new Chart(ctxDonHang, {
        type: 'bar',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Đơn hàng',
                data: [12, 19, 3, 5, 2, 3, 10],
                backgroundColor: '#54a0ff',
                borderRadius: 5
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 3. BIỂU ĐỒ KHÁCH HÀNG (Cột)
    const ctxKhachHang = document.getElementById('chartKhachHang').getContext('2d');
    new Chart(ctxKhachHang, {
        type: 'bar',
        data: {
            labels: ['Mới', 'Quen', 'VIP'],
            datasets: [{
                label: 'Khách hàng',
                data: [50, 30, 20],
                backgroundColor: ['#1dd1a1', '#ff9f43', '#ee5253'],
                borderRadius: 5
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
});