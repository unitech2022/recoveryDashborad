
import './App.css';
import Dashboard from './Components/Dashboard';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import CreateField from './Pages/Fields/Create';
import Fields from './Pages/Fields/Index';

import EditField from './Pages/Fields/Edit';
import DeleteField from './Pages/Fields/Delete';




import CreateMarket from './Pages/Markets/Create';
import EditMarket from './Pages/Markets/Edit';
import MarketDelete from './Pages/Markets/Delete';
import Markets from './Pages/Markets/Index';
import MarketDetail from './Pages/Markets/Detail';



import CityDetail from './Pages/Fields/Detail';

import Users from './Pages/Users/Index';
import Notifs from './Pages/Notifs/Index';
import CreateNotif from './Pages/Notifs/Create';
import GroupedReport from './Pages/Reports/GroupedReport';
import Orders from './Pages/Cards/Index';

import CreateCategory from './Pages/Categories/Create';

import EditCategory from './Pages/Categories/Edit';
import DeleteCategory from './Pages/Categories/Delete';
import UserDetail from './Pages/Users/Details';
import EditUser from './Pages/Users/Edit';
import Settings from './Pages/Settings/Index';
import EditSetting from './Pages/Settings/Edit';
import Categories from './Pages/Categories/Index';
import CategoryDetail from './Pages/Categories/Detail';
import CreateBanner from './Pages/Banners/Create';
import EditBanner from './Pages/Banners/Edit';
import DeleteBanner from './Pages/Banners/Delete';
import Banners from './Pages/Banners/Index';
import BannerDetail from './Pages/Banners/Detail';
import Subscriptions from './Pages/Subscriptions/Index';
import Cards from './Pages/Cards/Index';
import CreateCard from './Pages/Cards/Create';
import EditCard from './Pages/Cards/Edit';
import DeleteCard from './Pages/Cards/Delete';
import CardDetail from './Pages/Cards/Detail';
import CreateSetting from './Pages/Settings/Create';
import Alerts from './Pages/Alerts/Index';
import CreateAlert from './Pages/Alerts/Create';
import DeleteAlert from './Pages/Alerts/Delete';


function App() {
  return (
    <div className="App">
      <Router >
        <Routes >
        <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="admin"  element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />

          {/* categories */}
          <Route path="category/add" element={<CreateCategory />} />
          <Route path="category/edit" element={<EditCategory/>} />
          <Route path="category/delete" element={<DeleteCategory />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/detail" element={<CategoryDetail />} />

           {/* Markets */}
           <Route path="market/add" element={<CreateMarket/>} />
          <Route path="market/edit" element={<EditMarket />} />
          <Route path="market/delete" element={<MarketDelete />} />
          <Route path="markets" element={<Markets />} />
          <Route path="market/detail" element={<MarketDetail />} />

           {/* Products */}
           <Route path="banner/add" element={<CreateBanner/>} />
          <Route path="banner/edit" element={<EditBanner />} />
          <Route path="banner/delete" element={<DeleteBanner />} />
          <Route path="banners" element={<Banners />} />
          <Route path="banner/detail" element={<BannerDetail />} />

           {/* Offers */}
          <Route path="card/add" element={<CreateCard/>} />
          <Route path="card/edit" element={<EditCard />} />
          <Route path="card/delete" element={<DeleteCard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="subscriptions" element={<Subscriptions/>} />
          <Route path="card/detail" element={<CardDetail />} />

           {/* Cities */}
           <Route path="Field/add" element={<CreateField/>} />
          <Route path="Field/edit" element={<EditField />} />
          <Route path="Field/delete" element={<DeleteField/>} />
          <Route path="Fields" element={<Fields/>} />
          <Route path="City/detail" element={<CityDetail />} />

                 {/* Sittings */}
                 {/* <Route path="Category/add" element={<CreateCategory/>} />
          <Route path="Category/edit" element={<EditCategory />} />*/}
          <Route path="Setting/add" element={<CreateSetting />} />
          <Route path="Setting/edit" element={<EditSetting />} />
          <Route path="Sittings" element={<Settings />} />
          {/* <Route path="City/detail" element={<CityDetail />} /> */}

           {/* Users */}
          <Route path="users" element={<Users />} />
          <Route path="user/detail" element={<UserDetail />} />
          <Route path="user/edit" element={<EditUser />} />
{/* alerts */}
          <Route path="alerts" element={<Alerts />} />
          <Route path="alert/add" element={<CreateAlert />} />
          <Route path="alert/delete" element={<DeleteAlert />} />

           {/* Notifs */}
          <Route path="notifs" element={<Notifs />} />
          <Route path="notif/add" element={<CreateNotif />} />


          
            {/* Notifs */}
           <Route path="/admin/grouped-report" element={<GroupedReport />} />


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
