import './App.css';
import {Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import ReadPost from './pages/ReadPost';
import EditPost from './pages/EditPost';

function App() { 
  return (
     <UserContextProvider>
        <Routes> 
            <Route path='/' element={ <Layout/> } > 
                <Route index element={ <IndexPage /> } /> 
                <Route path='/login' element={ <LoginPage/> } />
                <Route path='/register' element={ <RegisterPage/> } /> 
                <Route path='/create' element={ <CreatePost /> } />
                <Route path='/post/:id' element={ <ReadPost/> } />
                <Route path='/edit/:id' element={ <EditPost/> } />
            </Route>
        </Routes>
     </UserContextProvider>

  );
}

export default App;