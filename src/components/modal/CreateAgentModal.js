import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import { CButton, CFormInput, CInputGroup, CInputGroupText, CRow, CFormSelect } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { createAgentAction } from '../../store/agent/agentThunk'
import { getAgentChatAction } from '../../store/chat/chatThunk'
import { ImSpinner8 } from 'react-icons/im'
// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['Admin', 'Agent', 'User']),
})

const CreateAgentModal = ({ modal, toggle }) => {
  const { isLoading } = useSelector((state) => state?.agent)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [showRecord, setShowRecord] = useState(5)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data) => {
    // Handle form submission
    let payload = {
      email: data.email,
      password: data?.password,
      name: data?.name,
      role: data?.role,
      status: 'active',
    }
    dispatch(
      createAgentAction({
        payload,
        onSuccess: () => {
          dispatch(getAgentChatAction({ page, showRecord, onSuccess: () => {} }))
          toggle()
        },
      }),
    )
  }

  return (
    <Modal  isOpen={modal} toggle={toggle} backdrop="static">
      <ModalHeader toggle={toggle}>Create Agent</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CInputGroup className="mb-3 mt-3">
            <CFormInput
              {...register('name')}
              type="name"
              placeholder="Name"
              invalid={!!errors.name}
              className="shadow-none"
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </CInputGroup>
          <CInputGroup className="mb-3 mt-3">
            <CFormInput
              {...register('email')}
              type="email"
              placeholder="Email"
              invalid={!!errors.email}
              className="shadow-none"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </CInputGroup>
          <CInputGroup className="mb-3 mt-3">
            <CFormInput
              {...register('password')}
              type="password"
              placeholder="Password"
              invalid={!!errors.password}
              className="shadow-none"
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </CInputGroup>
          <CInputGroup className="mb-3 mt-3">
            <CFormSelect
              id="role"
              name="role"
              type="role"
              {...register('role')}
              invalid={!!errors.role}
              className="shadow-none"
            >
              <option value="">Select Role</option>
              {/* <option value="Admin">Admin</option> */}
              <option value="Agent">Agent</option>
              {/* <option value="User">User</option> */}
            </CFormSelect>
            {errors.role && <div className="invalid-feedback">{'Role is required'}</div>}
          </CInputGroup>
          <ModalFooter>
            <CButton type="submit" disabled={isLoading} className="bg_gradient text-white">
              Create
              {isLoading && <ImSpinner8 className="spinning-icon" />}
            </CButton>{' '}
            <CButton disabled={isLoading} className="bg-danger text-white" onClick={toggle}>
              Cancel
            </CButton>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default CreateAgentModal
