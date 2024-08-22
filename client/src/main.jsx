import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { DocumentUploader, QrReader, DocumentViewer } from './customComponents/index.js'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<QrReader/>
      },
      {
        path:'/document-upload',
        element:<DocumentUploader/>
      },
      {
        path:'/document-viewer',
        element:<DocumentViewer/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router}/>
  // </StrictMode>
)
