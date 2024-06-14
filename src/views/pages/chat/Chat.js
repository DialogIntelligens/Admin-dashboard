import React from 'react';
import "../../../scss/style.scss";
import { useState } from 'react';

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CiMenuKebab } from 'react-icons/ci'
import { Link, useNavigate } from 'react-router-dom'
const Chat = () => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState(null)

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName)
  }
  const tableExample = [
    {
      chatbotId: '001',
      chatbotName: 'John',
      creationDate: 'Jan 1, 2023',
      action: 'View',
    },
    {
      chatbotId: '002',
      chatbotName: 'Smith',
      creationDate: 'Jan 1, 2023',
      action: 'View',
    },
    {
      chatbotId: '003',
      chatbotName: 'Cris',
      creationDate: 'Jan 1, 2023',
      action: 'View',
    },
  ]

  return (
    <>
      <div className="d-flex justify-content-between align-items-center main_chat">
        <div className="main_btns">
          <button
            className={` button-custom ${activeButton === 'Bot' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Bot')}
          >
            Bot
          </button>
          <button
            className={` button-custom ${activeButton === 'Agent' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Agent')}
          >
            Agent
          </button>
          <button
            className={` button-custom ${activeButton === 'Agent Request Pending' ? 'active' : ''}`}
            onClick={() => handleButtonClick('Agent Request Pending')}
          >
            Agent Request Pending
          </button>
        </div>
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap ">
          <CTableRow>
            <CTableHeaderCell className=" bg_gradient text-white">Chat Id</CTableHeaderCell>
            <CTableHeaderCell className=" bg_gradient text-white">Agent Name</CTableHeaderCell>
            <CTableHeaderCell className=" bg_gradient text-white">Creation Date</CTableHeaderCell>

            <CTableHeaderCell className=" bg_gradient text-white">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tableExample.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell>
                <Link className='link' to={'/message'}>
                  <div className="text-nowrap"> {item.chatbotId}</div>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
              <Link to={'/message'}>
                <div className="text-nowrap">{item.chatbotName}</div>
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <div className="text-nowrap">{item.creationDate}</div>
              </CTableDataCell>
              <CTableDataCell>
                <button className="btn">
                  <CiMenuKebab />
                </button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Chat
