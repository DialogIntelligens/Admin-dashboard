import React, {Suspense, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { setUserDetails } from '../store/user/userSlice'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
const DefaultLayout = () => {
  const dispatch = useDispatch()
  const { authUser } = useSelector((state) => state?.user)
  // console.log('authUSER', authUser)
  const navigate = useNavigate()
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('authAdmin'))
    if (!user?.Id) {
      navigate('/')
    }
    if (user?.Id) {
      dispatch(setUserDetails(user))
    }
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer fluid className="px-4">
            <Suspense fallback={<CSpinner color="primary" />}>
              <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                      />
                    )
                  )
                })}
                {/* Redirect to /dashboard if no route is matched */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </CContainer>
          {/* <AppContent /> */}
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
