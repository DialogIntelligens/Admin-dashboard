import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Form, Media, Card, CardBody, Input } from 'reactstrap'
import { FiSend, FiPaperclip, FiSmile, FiPlus, FiSearch } from 'react-icons/fi'
import EmojiPicker from 'emoji-picker-react'
import { MdDelete } from 'react-icons/md'
import avatar from '../../../assets/images/user.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  chatAction,
  getAgentChatAction,
  getAgentChatActionTwo,
} from '../../../store/chat/chatThunk'
import ChatSkelton from '../../../components/skelton/ChatSkelton'
import Pagination from '../../../components/pagination/Pagination'
import NoDataFound from '../../../components/skelton/NoDataFound'
import { useColorModes } from '@coreui/react'
import { RxAvatar } from 'react-icons/rx'

const Chat = () => {
  const dispatch = useDispatch()
  const { isLoading, user,colorMode } = useSelector((state) => state?.user)
  const { getChat, chatLoader, loaderTwo } = useSelector((state) => state?.chat)

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [file, setFile] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [chatId, setChatId] = useState('')
  const [userName, setUserName] = useState('')
  const [time, setTime] = useState('')
  const [userId, setUserId] = useState('')
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [page, setPage] = useState(1)
  const [showRecord, setShowRecord] = useState(5)
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingPage, setLoadingPage] = useState(false)
  const [leads, setLeads] = useState([])
  const [agent_Id, setAgentId] = useState('')
  const [filter, setFilter] = useState([]);
const [chatCard,setChatCard]=useState(true)
  const theme = localStorage.getItem('theme')
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
    }, 10000)
  }

  useEffect(() => {
    if (getChat && getChat?.details?.length > 0 && chatCard) {
      const initialLeads = getChat?.details[0]?.users
      const initialLead = initialLeads[0]
      setLeads(initialLeads)
      setChatId(initialLead?.chat_id)
      setUserName(initialLead?.user_name)
      setTime(initialLead?.date_time)
      setMessages(initialLead?.chat_history)
      setUserId(initialLead?.user_id)
      setSelectedChatId(initialLead?.chat_id)
    }
  }, [getChat])

  useEffect(() => {
    if (user?.Id) {
      dispatch(
        getAgentChatAction({
          page,
          showRecord,
          onSuccess: (data) => {
            setInitialLoading(false)
            setAgentId(data?.[0].agent_assignment_id)
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

  const handleSend = async (event) => {
    event.preventDefault()
    setChatCard(true)
    const formData = new FormData()
    const payload = {
      message: input,
      type: 'Agent',
      user_id: userId,
    }
    const filterPayload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => value !== '' && value !== null),
    )
    for (const key in filterPayload) {
      formData.append(key, payload[key])
    }

    // Add the new message to the messages state immediately
    const newMessage = {
      message: input,
      type: 'Agent',
      Datetime: 'just now',
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInput('')

    dispatch(
      chatAction({
        payload: formData,
        onSuccess: (data) => {},
        onFailure: (error) => {
          setMessages((prevMessages) => prevMessages.filter((msg) => msg !== newMessage))
        },
      }),
    )
  }

  const handleEmojiClick = (emojiObject) => {
    const emoji = String.fromCodePoint(...emojiObject.unified.split('-').map((u) => `0x${u}`))
    setInput(input + emoji)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleFileRemove = () => {
    setFile(null)
  }

  const handleClickOutside = (event) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false)
      setShowOptions(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleUserClick = (user) => {
    setChatCard(false)
    setChatId(user?.chat_id)
    setUserName(user?.user_name)
    setTime(user?.date_time)
    setMessages(user?.chat_history)
    setUserId(user?.user_id)
    setSelectedChatId(user?.chat_id)
  }

  const AgentsHandler = (item) => {
    setChatCard(false)
    setAgentId(item?.agent_assignment_id)
    setLeads(item?.users ?? [])
    setMessages(item?.users[0]?.chat_history)
    setUserName(item?.users[0]?.user_name ?? 'Name')
    setTime(item?.users[0]?.date_time ?? '00:00')
    setMessages(item?.users[0]?.chat_history ?? [])
    setSelectedChatId(item?.users[0]?.chat_id)
  }

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  // let colors = ['#A133FF','#33FF57','#FF33A1', '#A133FF',  '#FF5733', ]
  let colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"]


  return (
    <Container fluid className="p-3">
      {initialLoading || loadingPage ? (
        <ChatSkelton />
      ) : (
        <Row className="justify-content-center">
          <Col md={3}>
            {getChat?.details?.map((item, index) => (
              <Card
                key={index}
                onClick={() => AgentsHandler(item)}
                className="mb-2"
                style={{
                  backgroundColor:
                    agent_Id === item.agent_assignment_id && theme === 'dark'
                      ? '#ffffff'
                      : agent_Id === item.agent_assignment_id && theme === 'light'
                        ? '#212631'
                        : '',

                  color:
                    agent_Id === item.agent_assignment_id && theme === 'dark'
                      ? '#000000'
                      : agent_Id === item.agent_assignment_id && theme === 'light'
                        ? '#ffffff'
                        : '',
                }}
              >
                <CardBody>
                  <div
                    className="rounded "
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <div className="d-flex align-items-center pb-1">
                      <Media left>
                        <RxAvatar
                          size={50}
                          style={{ color: colors[index % colors.length] }}
                          className=" me-2"
                        />
                      </Media>
                      <Media body>
                        <p className="mb-0 text-capitalize">{item?.name}</p>
                      </Media>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>
          <Col md={4}>
            {leads?.length > 0 ? (
              <div className="overflow-auto" style={{ height: '30rem' }}>
                {leads?.map((item, index) => (
                  <Card
                    key={index}
                    onClick={() => handleUserClick(item)}
                    style={{
                      backgroundColor:
                        selectedChatId === item.chat_id && theme === 'dark'
                          ? '#ffffff'
                          : selectedChatId === item.chat_id && theme === 'light'
                            ? '#212631'
                            : '',

                      color:
                        selectedChatId === item.chat_id && theme === 'dark'
                          ? '#000000'
                          : selectedChatId === item.chat_id && theme === 'light'
                            ? '#ffffff'
                            : '',
                    }}
                    className={`mb-2 ${selectedChatId === item.chat_id ? 'border border-2 border-primary' : ''}`}
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
                              <p className="mb-0 text-capitalize">{item?.user_name}</p>
                            </Media>
                          </div>
                          <small>
                            {item?.date_time !== undefined && item?.date_time !== null
                              ? item?.date_time
                              : '00:00'}{' '}
                          </small>
                        </div>
                        <small
                          style={{ maxWidth: ' 250px' }}
                          className={`d-inline-block text-truncate ${item.agent_last_seen === true ? '' : 'fw-bold'}`}
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
          <Col md={5}>
            {leads.length > 0 && (
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
                        {userName ?? 'Name'}
                      </Media>
                      <small>{time !== undefined ? time : '00:00'}</small>
                    </Media>
                  </div>
                  <div id="chat-container" className="chat-container">
                    {messages?.map(
                      (msg, index) =>
                        msg?.message && ( // Check if msg.message is not null before rendering
                          <div
                            key={index}
                            className={`mb-2 ${msg.type === 'Agent' ? 'text-end px-1' : 'text-start'}`}
                          >
                            <div
                              className={`d-inline-block p-2 rounded ${
                                msg.type === 'Agent'
                                  ? 'bg-primary text-white'
                                  : 'bg-light text-dark'
                              }`}
                            >
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: msg?.message.replace(/\n/g, '<br>'),
                                }}
                              />
                            </div>
                            <div className="small text-muted mt-1">{msg?.Datetime}</div>
                          </div>
                        ),
                    )}

                    {/* <div ref={messagesEndRef} /> */}
                  </div>
                  <div>
                    {file && (
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
                    )}
                  </div>

                  <Form inline className="w-100 d-flex position-relative" onSubmit={handleSend}>
                    <Input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message"
                      className="me-1 flex-grow-1 shadow-none"
                    />
                    <Button className="bg_gradient" type="submit">
                      <FiSend />
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Col>
          <Col md={12}>
            {getChat?.details?.length > 0 && (
              <Pagination
                page={page}
                setPage={(newPage) => {
                  setPage(newPage)
                  setChatCard(true)
                }}
                total={getChat?.total_agents}
                totalPages={getChat?.total_pages}
                setShowRecord={setShowRecord}
                showRecord={showRecord}
              />
            )}
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Chat
