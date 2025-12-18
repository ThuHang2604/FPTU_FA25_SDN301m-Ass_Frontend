import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios';

axios.defaults.baseURL = 'https://fptu-fa-25-sdn-301m-assignment.vercel.app'; // Sử dụng proxy từ Vite config

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)