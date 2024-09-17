
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Record from './Record.jsx'


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'record',
        element:<Record/>
    }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>

    <App />
  </RouterProvider>
 
)
