import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MainComponent } from './component/main-component/main-component';
import { Login } from './component/login/login';
import { Unregistered } from './component/unregistered/unregistered';
import { Register } from './component/register/register';
import { VideoHome } from './component/videos-home/video-home';
import { AdminLogin } from './component/admin-login/admin-login';
import { AdminHome } from './component/admin-home/admin-home';
import { AddVideos } from './component/add-videos/add-video';
import { ViewVideo } from './component/view-video/view-video';
import { DeleteVideo } from './component/delete-video/delete-video';
import { EditVideo } from './component/edit-video/edit-video';
import { useCookies } from 'react-cookie'
import { Logout } from './component/log-out/logout';
import { ForgotPass } from './component/user-forget-pass/forget-pass';
import { UpdatePass } from './update-password/update-password';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <header className='bg-dark text-white d-flex justify-content-between align-items-center'>
          <div>
            <Link to='/' className='text-white text-decoration-none'><h2 className='ms-4'>Tech-<span className='text-warning'>Video</span></h2></Link>
          </div>
          <div>
            {
              cookies['user-id']==undefined?
              <div>
                <Link to='/login' className='text-white text-decoration-none'><span className='fw-bold ms-4'><span className='bi bi-person-fill'></span> User-Login</span></Link>
                <Link to='/admin-login' className='text-white text-decoration-none'><span className='fw-bold ms-4 me-4'><span className='bi bi-person-fill'></span> Admin-Longin</span></Link>
              </div>:
              <div className='me-4 d-flex justify-content-center align-items-center'>
                <span className='bi bi-person-circle me-2'></span> {cookies['user-id']}
                <span><Logout/></span>
              </div>
            }
          </div>
        </header>
        <section className='d-felx' style={{height:'100vh'}}>
          <div>
            <Routes>
              <Route path='/' element= {<MainComponent />} />
              <Route path='/login' element= {<Login />} />
              <Route path='/unregistered' element = {<Unregistered />} />
              <Route path='/register' element= {<Register />}/>
              <Route path='/videos' element= {<VideoHome />}/>
              <Route path='/admin-login' element= {<AdminLogin/>} />
              <Route path='/admin-home' element= {<AdminHome/>}/>
              <Route path='/add-videos' element= {<AddVideos/>}/>
              <Route path='/view-video/:id' element= {<ViewVideo />} />
              <Route path='/edit-video/:id' element= {<EditVideo />} />
              <Route path='/delete-video/:id' element= {<DeleteVideo/>} />
              <Route path='/forgot-pass' element= {<ForgotPass />}/>
              <Route path='/update-pass' element={<UpdatePass/>} />
            </Routes>
          </div>
        </section>
      </BrowserRouter>
      <div>
        <div>
              <div>
                  <div className='d-flex justify-content-between bg-dark text-white'>
                      <h3>Tech-<span className="text-warning">Video</span></h3>
                      <div>
                          <span className="ms-4 bi bi-facebook"></span>
                          <span className="ms-4 bi bi-twitter"></span>
                          <span className="ms-4 bi bi-instagram"></span>
                          <span className="ms-4 bi bi-linkedin"></span>
                      </div>
                  </div>
                  <div>
                     
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
