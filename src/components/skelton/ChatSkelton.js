import React from 'react'
import { FiDivide } from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Container, Row, Col, Button, Form, Media, Card, CardBody, Input } from 'reactstrap'
const ChatSkelton = () => {
  return (
    <Container fluid className="p-3">
      <Row className="d-flex justify-content-center">
        <Col md={4}>
          <div>
            {[...Array(4)].map((_, index) => (
              <Card className="mb-1" key={index}>
                <CardBody>
                  <div className="rounded mb-2">
                    <div className="d-flex align-items-center">
                      <Skeleton height={50} width={50} className="rounded-circle me-2" />
                      <Skeleton height={20} width={100} className="rounded" />
                    </div>
                    <small>
                      <Skeleton height={10} className="rounded" />
                    </small>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={5}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="">
                  <Skeleton height={50} width={50} className="rounded-circle" />
                </div>
                <div>
                  <Skeleton height={13} width={80} className="rounded-" />
                  <Skeleton height={10} width={30} className="rounded" />
                </div>
              </div>
              <div>
                <Skeleton height={350} className="rounded" />
              </div>

              <div className="d-flex">
                <Skeleton height={30} width={300} className="rounded me-2" />
                <Skeleton height={30} width={60} className="rounded" />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={12}>
          <div className="bg-white py-1 mt-2 d-flex align-items-center justify-content-center">
            <Skeleton height={30} width={400} className="rounded p-1" />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ChatSkelton
