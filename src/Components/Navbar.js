export default function Navbar(){
    return (
        <header className="top-header">
        <nav className="navbar navbar-expand gap-3 align-items-center">
          <div className="mobile-toggle-icon fs-3">
          <i class='bx bx-menu' ></i>
          </div>
          <form className="searchbar">
            <h6> لوحة التحكم والإدارة</h6>

          </form>
          <div className="top-navbar-right ms-auto">
            <ul className="navbar-nav align-items-center">
              <div className="user-setting d-flex align-items-center">
                <img src="../images/admin.png" className="user-img" alt="" />
              </div>
            </ul>
          </div>
        </nav>
      </header>
      
    );
}

