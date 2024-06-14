import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import logo from 'src/assets/images/logo.jpg'
// sidebar nav config
import navigation from '../_nav'
import { set } from '../store/sidebar/sidebarSlice'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const { sidebarShow } = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(set({ idebarShow: visible }))
      }}
    >
      <CSidebarHeader className="border-bottom">
        {/* <CSidebarBrand to="/"> */}
        <img
          src={logo}
          className="w-100 rounded"
          style={{ objectFit: 'cover' }}
          height={50}
          alt="Logo"
        />
        {/* <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> */}
        {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        {/* </CSidebarBrand> */}
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(set({ sidebarShow: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
