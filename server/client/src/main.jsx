import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import DochakiContextProvider from './components/Context/Contact.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DochakiContextProvider>
      <App />
    </DochakiContextProvider>
  </BrowserRouter>
)
