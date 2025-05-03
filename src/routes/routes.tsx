/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Route, Routes as Switch, useLocation } from 'react-router-dom';
import { Home } from '../pages';
import Auth from './../pages/auth/auth';
import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
import Register1step from '../pages/auth/components/register';
import Register2steps from '../pages/auth/components/register2step';
import Verificationreset from '../pages/auth/components/verificationreset';
import Profile from '../pages/profile/profie';
import MasterService from '../pages/profile/service/masterservice';
import Mylikes from '../pages/home/mylikes';
import Mysaved from '../pages/home/mysaved';
import MyBooking from '../pages/home/mybooking/mybooking';
import Shop from '../pages/shop/shop';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import FAQPage from '../pages/Faq/Faqpage';
import BlogpageDetail from '../pages/home/blog/blogpagedetail';
// import ProductDetail from '../pages/shop/components/productdetail';
import Blog from '../pages/home/blog/blog';
import Services from '../pages/services/services';
// import FaqPage from '../pages/Faqnew/Faqpage';
import FAQPage from './../pages/Faq/Faqpage';
import ContactUspage from '../pages/contactus/Contactuspage';
// import BlogDetailPage from '../pages/home/blog/blogpagedetail';
import BlogDetailPage from './../pages/home/blog/BlogDetailpages';
import ProductPage from '../pages/testui/testui';
import ServiceDetailPage from '../pages/services/service-detail/service-detail';
import ShoppingCart from '../pages/cartpayment/cartpayment';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/loading/LoadingScreen';
// interface RoutesProps {
// 	search: string;
// 	// lang: string;
// }

const Routes = () => {


	const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 sekundda loading yo'qoladi, xohlasang o'zgartirasan

    return () => clearTimeout(timer);
  }, [location.pathname]); // 🔥 har safar route o'zgarganda ishlaydi
	
	return (
<>
		{loading && <LoadingScreen />}
		<Switch>
			<Route path="/" element={<Home.Home />} />
			<Route path="/blog" element={<Blog/>}/>
			<Route path='/login' element={<Login />}/>
			<Route path='/auth' element={<Auth/>}/>
			<Route path='/register' element={<Register1step/>}/>
			<Route path='/register2step' element={<Register2steps phone={''} gender={''} house={''}/>}/>
			<Route path='/verificationemail' element={<Verificationreset/>}/>
			<Route path='/forgotpassword' element={<ForgotPassword/>} />
			<Route path="/services/:id" element={<Services  />}/>
			<Route path='/profile' element={<Profile/>}/>
			<Route path='/mylikes' element={<Mylikes/>}/>
			<Route path='/profile/mylikes' element={<Mylikes/>}/>
			<Route path='/mysaved' element={<ShoppingCart/>}/>
			<Route path='/profile/mysaved' element={<Mysaved/>}/>
			<Route path='/mybooking' element={<MyBooking/>}/>
			<Route path='/profile/service' element={<MasterService/>}/>
			<Route path='/shop' element={<Shop/>}/>
			<Route path='/faq' element={<FAQPage/>}/> 
			<Route path="/blog/:id" element={<BlogDetailPage/>} />
            <Route path="/product/:id" element={<ProductPage  />} />
			<Route path="/contact-us" element={<ContactUspage/>}/>
			<Route path="/service-detail/:id" element={<ServiceDetailPage/>}/>
			<Route path='/cartpayment' element={<ShoppingCart/>} />
			
	    	</Switch> 
			</>
	);
};

export default Routes;