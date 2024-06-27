import React, { useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAnalyticsAction } from '../../../store/chat/chatThunk'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
const Dashboard = () => {
  const dispatch = useDispatch()
  const { getAnalytics, isLoading } = useSelector((state) => state?.chat)
  useEffect(() => {
    dispatch(getAnalyticsAction())
  }, [])
  return (
    <>
      <Row>
        <Col md={4}>
          <Card className="bg-primary">
            <CardBody>
              <h4>Number of Agents</h4>
              {isLoading ? (
                <Skeleton className="w-100 h-25" />
              ) : (
                <h4>{getAnalytics?.Agents ?? 0}</h4>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-info">
            <CardBody>
              <h4>Number of Chats</h4>
              {isLoading ? (
                <Skeleton className="w-100 h-25" />
              ) : (
                <h4>{getAnalytics?.Chats ?? 0}</h4>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-warning">
            <CardBody>
              <h4>Number of Leads</h4>
              {isLoading ? (
                <Skeleton className="w-100 h-25" />
              ) : (
                <h4>{getAnalytics?.Leads ?? 0}</h4>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
