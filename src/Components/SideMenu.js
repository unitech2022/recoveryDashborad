
import loadjs from 'loadjs';
import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import ExternalScripts from './ExternalScripts';


export default function Sidebar (){

  const navigateTo = useNavigate()

  return <aside className="sidebar-wrapper" data-simplebar="true">

  <ExternalScripts/>

 <div className="sidebar-header">
   <div>
     <img src="../images/logo-app.png" className="logo-icon rounded-circle"  alt="logo icon" />
   </div>
   <div>
     <h4 className="logo-text">Recovery Zone </h4>
   </div>
   <div className="toggle-icon ms-auto"> <i class='bx bx-menu' ></i>
   </div>
 </div>
 {/*navigation*/}
 <ul className="metismenu" id="menu">
   <li>
     <a onClick={e=>navigateTo("/admin/home")} aria-expanded="true">
       <div className="parent-icon"><i className="bi bi-house-fill" />
       </div>
       <div className="menu-title">الرئيسية</div>
     </a>
   </li>

   {/* categories  */}
   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-grid-1x2" />
       </div>
       <div className="menu-title">التصنيفات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/Fields")}> <a ><i className="bi bi-circle" />قائمة التصنيفات</a>
       </li>
       <li onClick={e=>navigateTo("/admin/Field/add")}> <a><i className="bi bi-circle" />إضافة تصنيف</a>
       </li>
     </ul>
   </li>

   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-grid-fill" />
       </div>
       <div className="menu-title">الاقسام</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/categories")}> <a ><i className="bi bi-circle" />قائمة الاقسام</a>
       </li>
       <li onClick={e=>navigateTo("/admin/category/add")}> <a><i className="bi bi-circle" />إضافة قسم</a>
       </li>
     </ul>
   </li>

   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-grid-fill" />
       </div>
       <div className="menu-title">المزودين</div>
     </a>
     <ul>
       

       <li> <a onClick={e=>navigateTo("/admin/fields")}><i className="bi bi-circle" />قائمة المزودين</a>
       </li>

       
     </ul>
   </li> */}

   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-shop-window" />
       </div>
       <div className="menu-title">المتاجر</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/markets")}> <a ><i className="bi bi-circle" />قائمة المتاجر</a>
       </li>
       <li onClick={e=>navigateTo("/admin/market/add")}> <a><i className="bi bi-circle" />إضافة متجر</a>
       </li>
     </ul>
   </li>
   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-bookmark-star" />
       </div>
       <div className="menu-title">الاعلانات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/banners")}> <a ><i className="bi bi-circle" />قائمة الاعلانات</a>
       </li>
       <li onClick={e=>navigateTo("/admin/banner/add")}> <a><i className="bi bi-circle" />إضافة اعلان</a>
       </li>
     </ul>
   </li>

   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i class="bi bi-credit-card-2-front-fill"></i>
       </div>
       <div className="menu-title">ركوفرى كارد</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/cards")}> <a ><i className="bi bi-circle" />قائمة الكارد</a>
       </li>
      
     </ul>
   </li>

   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-bookmark-star" />
       </div>
       <div className="menu-title">الاشتراكات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/subscriptions")}> <a ><i className="bi bi-circle" />قائمة الاشتراكات</a>
       </li>
      
     </ul>
   </li>

   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-award-fill" />
       </div>
       <div className="menu-title">الطلبات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/orders")}> <a ><i className="bi bi-circle" />قائمة الطلبات</a>
       </li>
       <li onClick={e=>navigateTo("/admin/product/add")}> <a ><i className="bi bi-circle" />إضافة عرض</a>
       </li>
     </ul>
   </li> */}


   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-people" />
       </div>
       <div className="menu-title">المستخدمين</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/users")}> <a ><i className="bi bi-circle" />قائمة المستخدمين</a>
       </li>

     </ul>
   </li> */}
 
  

 


   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bx bxs-offer" />
       </div>
       <div className="menu-title">طلبات الرصيد</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/wallet")}> <a><i className="bi bi-circle" />قائمة طلبات الرصيد</a>
       </li>
     
     </ul>
   </li>
*/}
   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bi bi-gear" />
       </div>
       <div className="menu-title">الاعدادات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/Sittings")}> <a ><i className="bi bi-circle" />قائمة الاعدادات</a>
       </li>
       <li> <a href="/admin/Setting/add"><i className="bi bi-circle" />إضافة اعداد</a>
       </li>
     </ul>
   </li> 

   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i class="bi bi-bell"></i>
       </div>
       <div className="menu-title">الاشعارات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/alerts")}> <a ><i className="bi bi-circle" />قائمة الاشعارات</a>
       </li>
       <li> <a href="/admin/alert/add"><i className="bi bi-circle" />ارسال اشعار</a>
       </li>
     </ul>
   </li> 
   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bx bxs-package" />
       </div>
       <div className="menu-title">الباقات</div>
     </a>
     <ul>
       <li> <a href="/Packages/Index"><i className="bi bi-circle" />قائمة الباقات</a>
       </li>
       <li> <a href="/Packages/Create"><i className="bi bi-circle" />إضافة باقة</a>
       </li>
     </ul>
   </li> */}


   {/* <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bx bxs-buildings" />
       </div>
       <div className="menu-title">المدن</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/Cities")}> <a ><i className="bi bi-circle" />قائمة المدن</a>
       </li>
       <li onClick={e=>navigateTo("/admin/City/add")}> <a ><i className="bi bi-circle" />إضافة مدينة</a>
       </li>
     </ul>
   </li>
   <li>
     <a href="javascript:;" className="has-arrow">
       <div className="parent-icon"><i className="bx bxs-bell" />
       </div>
       <div className="menu-title">الإشعارات</div>
     </a>
     <ul>
       <li onClick={e=>navigateTo("/admin/notifs")}> <a ><i className="bi bi-circle" />قائمة الإشعارات</a>
       </li>
       <li onClick={e=>navigateTo("/admin/notif/add")}> <a ><i className="bi bi-circle" />إشعار إلي مستخدم</a>
       </li>
     </ul>
   </li> */}

   <li>
     <a onClick={e=>{
     localStorage.clear()
    navigateTo("/")
     }} aria-expanded="true">
       <div className="parent-icon"><i class='bx bxs-exit'></i>
       </div>
       <div className="menu-title">تسجيل الخروج</div>
     </a>
   </li>

   {/*end navigation*/}
 </ul></aside>
}

