import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Media, Card, CardBody, Input } from 'reactstrap'
import { FiSend, FiPaperclip, FiSmile, FiPlus, FiSearch } from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react'
import { MdDelete } from 'react-icons/md'
import avatar from '../../../assets/images/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAgentChatActionTwo, getAIChatAction } from '../../../store/chat/chatThunk'
import ChatSkelton from '../../../components/skelton/ChatSkelton'
import Pagination from '../../../components/pagination/Pagination'
import NoDataFound from '../../../components/skelton/NoDataFound'
import { useColorModes } from '@coreui/react'
import { RxAvatar } from 'react-icons/rx'

const AiChats = () => {
  const dispatch = useDispatch()
  const theme = localStorage.getItem('theme')

  const { isLoading, user, colorMode } = useSelector((state) => state?.user)
  const { getAIChat, getAIChatLoader } = useSelector((state) => state?.chat)

  const messagesEndRef = useRef(null)

  const [initialLoading, setInitialLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [showRecord, setShowRecord] = useState(5)
  const [loadingPage, setLoadingPage] = useState(false)
  const [selectedUId, setSelectedUId] = useState(null)

  console.log(selectedUId,"<<<<<<")
  const [time, setTime] = useState('')
  const [userId, setUserId] = useState('')
  const [allUser, setAllUser] = useState([])
  let intervalId

  const startTimerAPI = () => {
    intervalId = setInterval(() => {
      dispatch(
        getAIChatAction({
          adminID: user?.Id,
          page,
          showRecord,
          onSuccess: (data) => {
            // Handle success if needed
          },
        }),
      )
    }, 10000)
  }
  const handleClickOutside = (event) => {
    // if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
    //   setShowEmojiPicker(false)
    //   setShowOptions(false)
    // }
  }

  const handleUserClick = (user) => {
    setTime(user?.Datetime)
    setMessages(user?.chat_history)
    setUserId(user?.uid)
    setSelectedUId(user?.uid)
  }

  useEffect(() => {
    if (user?.Id) {
      dispatch(
        getAIChatAction({
          adminID: user?.Id,
          page,
          showRecord,
          onSuccess: (data) => {
            setInitialLoading(false)
            startTimerAPI()
          },
        }),
      )
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [user?.Id, page])

  useEffect(() => {
    if (page >= 1 && user?.Id) {
      setLoadingPage(true)
      dispatch(
        getAgentChatActionTwo({
          page,
          showRecord,
          onSuccess: (data) => {
            setLoadingPage(false)
          },
        }),
      )
    }
  }, [page, showRecord])

  useEffect(() => {
    if (getAIChat && getAIChat?.details?.length > 0) {
      const initialChats = getAIChat?.details
      const initialChat = initialChats[0]
      if(!selectedUId){
      setAllUser(initialChats)
      setTime(initialChat?.Datetime)
      setMessages(initialChat?.chat_history)
      setUserId(initialChat?.uid)
      setSelectedUId(initialChat?.uid)
    }}
  }, [getAIChat])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])
  let colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF']

  return (
    <Container fluid className="p-3">
      {initialLoading || loadingPage ? (
        <ChatSkelton />
      ) : (
        <Row className="justify-content-center">
          <Col md={4}>
            {allUser?.length > 0 ? (
              <div className="overflow-auto" style={{ height: '30rem' }}>
                {allUser?.map((item, index) => (
                  <Card
                    key={index}
                    onClick={() => handleUserClick(item)}
                    style={{
                      backgroundColor:
                        selectedUId === item.uid && theme === 'dark'
                          ? '#ffffff'
                          : selectedUId === item.uid && theme === 'light'
                            ? '#212631'
                            : '',

                      color:
                        selectedUId === item.uid && theme === 'dark'
                          ? '#000000'
                          : selectedUId === item.uid && theme === 'light'
                            ? '#ffffff'
                            : '',
                    }}
                    className={`mb-2 ${selectedUId === item.uid ? 'border border-2 border-primary' : ''}`}
                  >
                    <CardBody>
                      <div className="rounded mb-2" style={{ cursor: 'pointer' }}>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center mb-1">
                            <Media left>
                              <Media
                                object
                                src={avatar}
                                width={40}
                                height={40}
                                alt="User"
                                className="rounded-circle me-2"
                              />
                            </Media>
                            <Media body>
                              <p className="mb-0 text-capitalize">Anonymous</p>
                            </Media>
                          </div>
                          <small>
                            {item?.Datetime !== undefined && item?.Datetime !== null
                              ? item?.Datetime
                              : '00:00'}{' '}
                          </small>
                        </div>
                        <small
                          style={{ maxWidth: ' 250px' }}
                          // className={`d-inline-block text-truncate ${item.agent_last_seen === true ? '' : 'fw-bold'}`}
                          className={`d-inline-block text-truncate ${index === 3 ? '' : 'fw-bold'}`}
                        >
                          {item.last_message}
                        </small>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
          </Col>
          <Col md={8}>
            {allUser.length > 0 && (
              <Card className="chat-card">
                <CardBody>
                  <div className="d-flex align-items-center mb-3">
                    <Media left>
                      <div className="bg-danger rounded-circle"></div>
                      <Media
                        object
                        src={avatar}
                        alt="User"
                        className="rounded-circle me-2"
                        height={40}
                        width={40}
                      />
                    </Media>
                    <Media body>
                      <Media heading className="mb-0 text-capitalize">
                        {'Anonymous'}
                      </Media>
                      <small>{time !== undefined ? time : '00:00'}</small>
                    </Media>
                  </div>
                  <div id="chat-container" className="chat-container">
                    {messages?.map((msg, index) => {
                      return (
                        msg?.message && (
                          <div
                            key={index}
                            className={`mb-2 ${msg.type === 'AI' ? 'text-end px-1' : 'text-start'}`}
                          >
                            <div
                              className={`d-inline-block p-2 rounded ${
                                msg.type === 'AI' ? 'bg-primary text-white' : 'bg-light text-dark'
                              }`}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: msg?.message.replace(/\n/g, '<br>'),
                                }}
                              />
                            </div>
                            <div className="small text-muted mt-1">
                              {msg?.Datetime}
                            </div>
                          </div>
                        )
                      )
                    })}

                    {/* <div ref={messagesEndRef} /> */}
                  </div>
                  <div>
                    {/* {file && (
                  <div className="mt-2">
                    <div className="d-flex justify-content-center px-2 align-items-end">
                      <strong>{file.name}</strong>
                      <MdDelete
                        className="text-danger"
                        style={{ cursor: 'pointer' }}
                        size={22}
                        onClick={handleFileRemove}
                      />
                    </div>
                  </div>
                )} */}
                  </div>

                  {/* <Form inline className="w-100 d-flex position-relative" onSubmit={handleSend}> */}
                  {/* <Form inline className="w-100 d-flex position-relative">
                    <Input
                      type="text"
                      //   value={input}
                      //   onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message"
                      className="me-1 flex-grow-1 shadow-none"
                    />
                    <Button className="bg_gradient" type="submit">
                      <FiSend />
                    </Button>
                  </Form> */}
                </CardBody>
              </Card>
            )}
          </Col>

          {/* pagination */}

          {/* <Col md={12}>
          {getChat?.details?.length > 0 && (
          <Pagination
          //   page={page}
          //   setPage={(newPage) => {
          //     setPage(newPage)
          //     setChatCard(true)
          //   }}
          //   total={getChat?.total_agents}
          //   totalPages={getChat?.total_pages}
          //   setShowRecord={setShowRecord}
          //   showRecord={showRecord}
          />
          )}
        </Col> */}
        </Row>
      )}
    </Container>
  )
}

export default AiChats
