
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast' // ✅ Added

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
      <App />
      <Toaster
              position="top-right"
              toastOptions={{
                duration:2000,
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 16px',
                },
              }}
            />
  </Provider>
  

)
