/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import './styles/theme-config.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
