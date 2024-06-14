import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from '../../../store/user/userThunk'
import { useDispatch, useSelector } from 'react-redux'
import { ImSpinner8 } from 'react-icons/im'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state?.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data) => {
    let payload = {
      email: data.email,
      password: data.password,
    }
    dispatch(
      loginUser({
        payload,
        onSuccess: () => {
          navigate('/dashboard')
        },
      })
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CRow>
                      <CCol xs={12} className="d-flex justify-content-center">
                        <h1>Login</h1>
                      </CCol>
                    </CRow>

                    <CInputGroup className="mb-3 mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        invalid={!!errors.email}
                        className='shadow-none'
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </CInputGroup>
                    <CInputGroup className="mb-4 mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        invalid={!!errors.password}
                        className='shadow-none'
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} className="d-flex justify-content-center">
                        <CButton
                          type="submit"
                          disabled={isLoading}
                          color="primary"
                          className="px-4"
                        >
                          Login
                          {isLoading && <ImSpinner8 className="spinning-icon" />}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
