import { Outlet } from 'react-router-dom'


function LoginLayout() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-[#EEF2DB]">
      <Outlet />
    </div>
  )
}

export default LoginLayout