Responsive for all desktops, iPhone 12, and Ipad Mini
Use all API routes
Minimum 3 forms submission
Minimum 1 theme change feature (eg dark mode)
Persistent login
Must have a protected layout for login-only users.
Image upload
Must have a User profile page
Must have at least 4-page routing
Must have NavBar with logo, Footer, Pagination, Search bar
Must have at least 2 animations (For example Loading spinner, animated search, or animated button ...)

## DECOR STORE

### Authentications

- User can login with email and password.
- User can resgister with usename, email, password.
- User stay logged in with refreshing page.

### User profile

- User can see his/her profile on the left side of the page.


### Pages
- Main header chứa logo bên trái, number login sign up và cart bên phải

# UI
    - page login
    - page register
    - home page có các list products theo thể loại
    - products category page
    - detail page
    - profile page
    - cart page

    - Search query để lại làm sau.

    - Product list k call được dữ liệu khi dispatch action khác.
    

    B1: Trong cartShema tạo 1 customerId ref đến "Users"
    gọi component trong productCard thì nó lại call api lại nhiều lần.

    profile about: update profile, accountPage;

    <!-- ## Đang lỗi avatar... -->

sx={{ width: { md: "350px", xs: "200px" } }}

-- Số trên icon Cart đang lỗi lúc render bị mất.
-- Không delete được địa chỉ.
-- 


đã sửa lỗi logout hiển thị số sản phẩm trên icon cart;
vào home render ra list sp theo 2 thể loại nổi bật là cây cảnh và mô hình trang trí;
có 1 form collection chứa feature fitler và sortBy, filter lọc theo từng categories của sản phẩm,
sorrt by price and date, đôngf thời chứa icon cart, k thể vào cart nếu chưa login, Click vào icon cart để navigate về login, sau khi login sẽ tự đông chuyển vào checkout page để kiểm tra giỏ hàng. Ở trên page render các sản phấm , bạn có thể click vào icon cart để add sản phẩm với số lượng 1 hoặc click vào icon menu.
ở trong menu từng card có thong tin về giá, hình ảnh sản phẩm rõ ràng hơn, thêm 1 hoặc nhiều sản phẩm, có thể vào detailPage xem chi tiết từng sản phẩm.
1 product list chứa nhiều card theo limit và pagination.

Có các page:
HomePage
DetailPage
CtegoriesPage
CheckoutPage
notFoundPage

