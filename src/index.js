import ReactDom  from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDom.render(
              <BrowserRouter>
              <App></App>
              </BrowserRouter>,
document.getElementById('root'));