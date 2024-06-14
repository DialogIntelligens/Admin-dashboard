import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLeadAction, deleteLeadAction } from '../../../store/lead/leadThunk'
import TableSkelton from '../../../components/skelton/TableSkelton'
import NoDataFound from '../../../components/skelton/NoDataFound'
import { MdDelete } from 'react-icons/md'
import UpdateStatus from '../../../components/modal/StatusModal'
import Pagination from '../../../components/pagination/Pagination'
const Lead = () => {
  const dispatch = useDispatch()
  const { getLead, isLoading, deleteLoader } = useSelector((state) => state?.lead)
  console.log("getLead",getLead)
  const [Id, setId] = useState('')
  const [modal, setModal] = useState(false)
  const [page, setPage] = useState(1)
  const [showRecord, setShowRecord] = useState(5)
  const toggle = () => {
    setModal(!modal)
  }
  useEffect(() => {
    dispatch(getLeadAction({page,showRecord}))
  }, [page])

  const onDelete = (item) => {
    setModal(true)
    setId(item)
  }
  const onConfirm = () => {
    dispatch(
      deleteLeadAction({
        Id,
        onSuccess: () => {
          dispatch(getLeadAction({page,showRecord}))
          toggle()
        },
      }),
    )
  }
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg_gradient text-white">Id</CTableHeaderCell>
            <CTableHeaderCell className="bg_gradient text-white">Name</CTableHeaderCell>
            <CTableHeaderCell className="bg_gradient text-white">Email</CTableHeaderCell>
            <CTableHeaderCell className="bg_gradient text-white">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading ? (
            <TableSkelton Rows={4} />
          ) : getLead?.details?.length > 0 ? (
            getLead &&
            getLead?.details?.length > 0 &&
            getLead?.details?.map((item, index) => (
              <>
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <div className="text-nowrap">{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-nowrap">{item?.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-nowrap"> {item?.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <MdDelete
                      style={{ cursor: 'pointer' }}
                      size={22}
                      className="text-danger"
                      onClick={() => onDelete(item?.user_id)}
                    />
                  </CTableDataCell>
                </CTableRow>
              </>
            ))
          ) : (
            <NoDataFound />
          )}
        </CTableBody>
      </CTable>
      {getLead?.details?.length > 0 && isLoading || (
        <Pagination
          page={page}
          setPage={(newPage) => {
            setPage(newPage)
          }}
          total={getLead?.total_leads}
          totalPages={getLead?.total_pages}
          setShowRecord={setShowRecord}
          showRecord={showRecord}
        />
      )}

      {modal && (
        <UpdateStatus
          open={open}
          handler={onConfirm}
          loader={deleteLoader}
          onClose={toggle}
          text="delete"
        />
      )}
    </>
  )
}

export default Lead
