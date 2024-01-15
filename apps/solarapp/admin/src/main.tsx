import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app/App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        autoClose={5000}
        draggable
        enableMultiContainer
        hideProgressBar={false}
        newestOnTop={true}
        position="bottom-right"
      />
    </BrowserRouter>
  </StrictMode>
);
