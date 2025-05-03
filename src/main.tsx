import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
)
if (window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "register" || window.location.pathname.split("/")[1] === "forgotpassword" || window.location.pathname.split("/")[1] === "auth" || window.location.pathname.split("/")[1] === "register2step" || window.location.pathname.split("/")[1] === "verificationemail") {
    document.body.style.backgroundColor = "#C8A2C8 ";
  }else{
    document.body.style.backgroundColor = "#FFF"
  }