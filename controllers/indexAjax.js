function getDataSinhVienApi() {
    let promise = axios({
        url: "https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien",
        method: "GET",
    });
    promise.then(function (result) {
        console.log("result", result.data);
        // gọi hàm để từ dữ liệu  tạo ra thẻ tr trên tbody
        renderSinhVien(result.data);
    });
    promise.catch(function (err) {
        console.log(err);
    });
}
//sau khi load xong giao diện thì tự động thực thi các hàm function n
window.onload = function () {
    //Gọi api lấy data từ be
    getDataSinhVienApi();
};
/**
 * Hàm này sẽ nhận vào 1 array (sinhVien) và trả ra output là string <tr>....</tr>
 * @param {*} arrSinhVien arrSinhVien là mảng các object sinhVien [sinhVien1,sinhVien2,...]
 * @returns trả ra 1 giá trị là 1 htmlString '<tr>...</tr> <tr>...</tr>'
 */
function renderSinhVien(arrSinhVien) {
    //param : input :arrSinhVien
    var html = ""; //output: string html
    for (var i = 0; i < arrSinhVien.length; i++) {
        var sv = arrSinhVien[i]; //Mỗi lần duyệt lấy ra 1 object sinhVien từ mảng {maSinhVien:'1',tenSinhVien:'...',...}
        html += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.soDienThoai}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-primary mr-2" onclick="chinhSua('${sv.maSinhVien}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector("tbody").innerHTML = html;
}

function chinhSua(maSV) {
    console.log(maSV);
    let promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' +maSV,
        method:'GET'
    });
    promise.then(function (result) {
        console.log(result.data)
        document.querySelector('#maSinhVien').value=result.data.maSinhVien;
        document.querySelector('#tenSinhVien').value=result.data.tenSinhVien;
        document.querySelector('#email').value=result.data.email;
        document.querySelector('#soDienThoai').value=result.data.soDienThoai;
        document.querySelector('#loaiSinhVien').value=result.data.loaiSinhVien;
        document.querySelector('#diemToan').value=result.data.diemToan;
        document.querySelector('#diemLy').value=result.data.diemLy;
        document.querySelector('#diemHoa').value=result.data.diemHoa;
        document.querySelector('#diemRenLuyen').value=result.data.diemRenLuyen;
        getDataSinhVienApi();
    });
    promise.catch(function (error) {
        console.log(error);
    })
}

function xoaSinhVien(maSV) {
    console.log(maSV);
    let promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' +maSV,
        method:'DELETE'
    });
    promise.then(function (result) {
        console.log(result.data)
        getDataSinhVienApi();
    });
    promise.catch(function (error) {
        console.log(error);
    })
}
//------------------POST thêm dữ liệu vào server

document.querySelector('#btnXacNhan').onclick = function () {
    // lấy thông tin input từ người dùng: tạo ra format be yêu cầu
    let sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;

    console.log('sinhVien', sinhVien);


    let promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: sinhVien
    });
    promise.then(function (result) {
        console.log(result.data)
        getDataSinhVienApi();
    });
    promise.catch(function (error) {
        console.log(error);
    })
}