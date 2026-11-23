# HƯỚNG DẪN CẬP NHẬT NỘI DUNG WEBSITE (3 BƯỚC ĐƠN GIẢN)

Chị Hương có thể dễ dàng thêm tài liệu chuyên môn chính thức vào website mà **không cần sửa mã HTML hay CSS**.

---

## Bước 1: Lưu tệp tài liệu (nếu có PDF / DOCX)
- Chép tệp tài liệu chính thức (đã kiểm duyệt chuyên môn, không chứa thông tin nhạy cảm của trẻ và đúng quyền sử dụng) vào thư mục:
  `assets/docs/`
- Đặt tên tệp không dấu, ngắn gọn, nối bằng dấu gạch ngang. Ví dụ:
  `ke-hoach-tuan-1-chu-de-ban-than-24-36-thang.pdf`

## Bước 2: Thêm thông tin tài liệu vào `data/resources.json`
Mở tệp `data/resources.json`, tìm danh sách `"resources": [ ... ]` và thêm một khối thông tin mới theo đúng cấu trúc 9 trường mở rộng:

```json
{
  "id": "tl-24-36-001",
  "isDemo": false,
  "nhanMinhHoa": "",
  "ten": "Kế hoạch giáo dục tuần 1 – Chủ đề Bản thân (24–36 tháng)",
  "doTuoi": "24–36 tháng",
  "chuDe": "Bản thân",
  "loaiTaiLieu": "Kế hoạch giáo dục",
  "doiTuong": "Giáo viên",
  "tacGia": "Nguyễn Thị Hương",
  "nguonThamKhao": "Chương trình GDMN (Thông tư 01/2021/TT-BGDĐT)",
  "ngayCapNhat": "2026-12-01",
  "dinhDang": "PDF",
  "quyenSuDung": "Miễn phí tham khảo – Ghi nguồn GDMN",
  "tomTat": "Mô tả ngắn gọn mục tiêu và phạm vi ứng dụng của tài liệu.",
  "noiDungXemTruoc": [
    "Ý chính 1 hiển thị trong cửa sổ xem trước.",
    "Ý chính 2 hiển thị trong cửa sổ xem trước."
  ],
  "duongDanTai": "assets/docs/ke-hoach-tuan-1-chu-de-ban-than-24-36-thang.pdf"
}
```

> **Lưu ý quan trọng:**
> - Khi là tài liệu chính thức, đổi `"isDemo": false`.
> - Trường `"doTuoi"` phải chọn đúng 1 trong 6 giá trị chuẩn: `0–12 tháng`, `12–24 tháng`, `24–36 tháng`, `3–4 tuổi`, `4–5 tuổi`, `5–6 tuổi`.
> - Trường `"loaiTaiLieu"` phải chọn đúng 1 trong 8 chuyên mục chuẩn: `Kiến thức mầm non`, `Kế hoạch giáo dục`, `Kho giáo án`, `Trò chơi và học liệu`, `Âm nhạc và văn học`, `Phiếu quan sát trẻ`, `AI dành cho giáo viên`, `Góc phụ huynh`.
> - Nếu mở trực tiếp file `index.html` trên máy tính (không qua máy chủ web), hãy cập nhật đồng bộ sang tệp `js/fallback-data.js` (hoặc nhờ Antigravity cập nhật tự động cả 2 tệp trong 5 giây).

## Bước 3: Kiểm tra lại trên trình duyệt
- Mở `index.html` trên trình duyệt, gõ tên tài liệu vào ô tìm kiếm và bấm **Xem trước** để kiểm tra hiển thị trước khi đẩy lên GitHub.
