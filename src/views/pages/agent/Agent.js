import { CButton } from '@coreui/react'
import React from 'react'
import '../../../scss/style.scss'
import { useState, useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import CreateAgentModal from '../../../components/modal/CreateAgentModal'
import { AgentStatusAction } from '../../../store/agent/agentThunk'
import TableSkelton from '../../../components/skelton/TableSkelton'
import UpdateStatus from '../../../components/modal/StatusModal'
import NoDataFound from '../../../components/skelton/NoDataFound'
import Pagination from '../../../components/pagination/Pagination'
// import { getAgentChatAction, getAgentChatActionTwo } from '../../../store/agent/agentThunk'
import { getAgentChatAction, getAgentChatActionTwo } from '../../../store/chat/chatThunk'
const Agent = () => {
  const dispatch = useDispatch()
  const { getChat, statusLoader } = useSelector((state) => state?.chat)
  console.log("getChat",getChat)
  const { isLoading, user } = useSelector((state) => state?.user)
  const [modal, setModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState('')
  const [page, setPage] = useState(1)
  const [showRecord, setShowRecord] = useState(5)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingPage, setLoadingPage] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }
  const statushandler = (item) => {
    setOpen(!open)
    setData(item)
  }
  let intervalId
  const startTimerAPI = () => {
    intervalId = setInterval(() => {
      dispatch(
        getAgentChatAction({
          agentId: user?.Id,
          page,
          showRecord,
          onSuccess: (data) => {
            // Handle success if needed
          },
        }),
      )
    }, 5000)
  }

  useEffect(() => {
    if (user?.Id) {
      dispatch(
        getAgentChatAction({
          agentId: user?.Id,
          page,
          showRecord,
          onSuccess: (data) => {
            setInitialLoading(false)
          },
        }),
      )
    }
  }, [user?.Id, page])

  useEffect(() => {
    if (page >= 1 && user?.Id) {
      setLoadingPage(true)
      dispatch(
        getAgentChatActionTwo({
          agentId: user?.Id,
          page,
          showRecord,
          onSuccess: (data) => {
            setLoadingPage(false)
            console.log('Page data loaded for page', page)
          },
        }),
      )
    }
  }, [page, showRecord])

  const updateStatus = () => {
    let payload = {
      status: data?.status === 'block' ? 'active' : 'block',
      agent_id: data?.agent_id,
    }
    dispatch(
      AgentStatusAction({
        payload,
        onSuccess: () => {
          dispatch(getAgentAction())
          statushandler()
        },
      }),
    )
  }

  return (
    <div>
      <div className="d-grid gap-2 d-md-block">
        <CButton className="bg_gradient mb-4 text-white" onClick={toggle}>
          Create Agent
        </CButton>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="bg_gradient text-white">Agent Name</CTableHeaderCell>
              <CTableHeaderCell className="bg_gradient text-white">Agent Email</CTableHeaderCell>
              <CTableHeaderCell className="bg_gradient text-white">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {initialLoading || loadingPage ? (
              <TableSkelton Rows={3} />
            ) : getChat ? (
              getChat?.details?.length > 0 &&
              getChat?.details?.map((item, index) => (
                <CTableRow key={index} className="">
                  <CTableDataCell>
                    <div classNam="text-nowrap">{item?.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-nowrap">{item?.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    {item?.status === 'active' ? (
                      <CButton
                        onClick={() => {
                          statushandler(item)
                        }}
                        color="warning"
                        className="mb-2"
                      >
                        Block
                      </CButton>
                    ) : (
                      <CButton
                        onClick={() => {
                          statushandler(item)
                        }}
                        color="success"
                      >
                        Unblock
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <NoDataFound />
            )}
          </CTableBody>
        </CTable>
        {(getChat?.details?.length > 0 && initialLoading) || loadingPage || (
          <Pagination
            page={page}
            setPage={(newPage) => {
              setPage(newPage)
            }}
            total={getChat?.total_agents}
            totalPages={getChat?.total_pages}
            setShowRecord={setShowRecord}
            showRecord={showRecord}
          />
        )}
      </div>
      {modal && <CreateAgentModal modal={modal} toggle={toggle} />}
      {open && (
        <UpdateStatus
          open={open}
          handler={updateStatus}
          loader={statusLoader}
          onClose={statushandler}
          text="update"
        />
      )}
    </div>
  )
}

export default Agent
