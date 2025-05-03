/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useEffect, useState } from 'react';
import { Navbar } from './components';
// import NewNavbar from './components/newnavbar';
import { Routes } from './routes'; 
import Footer from "./components/Footer";
import MobileNavbar from './components/mobileNavbar';

interface AppProps {}
const App: FunctionComponent<AppProps> = () => {
	// const [search, setSearch] = useState('');
	// const [lang, setLang] = useState("");
	const [isMobile, setIsMobile] = useState(false);

	// const handleSearch = (value: string) => {
	// 	setSearch(value);
	// };
	// handleSearch("da")

	// const handleLanguage = (value: string) => {
	// 	setLang(value);
	// };
	useEffect(() => {
		const updateIsMobile = () => {
		  setIsMobile(window.innerWidth <= 768); // Mobile if screen width is 768px or less
		};
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);
	
		return () => {
		  window.removeEventListener('resize', updateIsMobile);
		};
	  }, []);

	return (
		<>
		{ window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "/forgotpassword" ?  (
 <Routes />
		): (
			<>
				  {isMobile ? (
            <MobileNavbar />
          ) : (
            <Navbar  />
			// <NewNavbar/>
          )}
				  <Routes />
				  <Footer/>
		 </>
		)
	}
	
		</>
	);
};

export default App;
