import React from "react";
import { Layout, Button, Card, Row, Col, Typography, Divider, Carousel } from "antd";
import Navbar from "./NavigationBar"; 
import bgSaintek from "../images/saintek-transformed.jpeg";
import person from "../images/user.png";
import "../style/home.css";

const { Content, Footer } = Layout;
const { Title } = Typography;

const events = [
  { title: 'Event 1', description: 'Deskripsi singkat tentang event 1.', date: '20 November 2024', image: 'https://via.placeholder.com/300x150' },
  { title: 'Event 2', description: 'Deskripsi singkat tentang event 2.', date: '25 November 2024', image: 'https://via.placeholder.com/300x150' },
  { title: 'Event 3', description: 'Deskripsi singkat tentang event 3.', date: '30 November 2024', image: 'https://via.placeholder.com/300x150' },
  { title: 'Event 4', description: 'Deskripsi singkat tentang event 4.', date: '5 Desember 2024', image: 'https://via.placeholder.com/300x150' },
];

const Home = () => {
  const teamMembers = [
    { nama:"Nama Ketua Unit",
      role: 'Ketua' },
    { nama:"Nama Wakil Ketua Unit",
      role: 'Wakil Ketua' },
    { nama:"Nama Anggota 1",
      role: 'Anggota' },
    { nama:"Nama Anggota 2",
      role: 'Anggota' },
    { nama:"Nama Anggota 3",
      role: 'Anggota' },
  ];

  const chunkArray = (arr, chunkSize) => {
    if (!Array.isArray(arr)) return [];
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };
  const eventChunks = chunkArray(events, 2);

  return (
    <Layout>
      <Navbar />
      <Content>
        <div className="bg">
          <img src={bgSaintek} className="img" alt="Background Saintek" />
          <div className="text-overlay">
            <p className="p">Yuk Selesaikan Praktek <br /> IbTiTah-nya!</p>
            <Button className="button-custom">Register</Button>
          </div>
        </div>

        <div className="struktur">
          <Title className="title-card">Struktur</Title>
          <Row gutter={[16, 18]} justify="center">
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card className="card">
                  <div className="card-content">
                    <img src={person} alt="Person" className="profile-image" />
                    <div className="card-info">
                      <Title level={4} className="name">{member.nama}</Title>
                      <Divider className="divider" />
                      <Title level={5} className="role">{member.role}</Title>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className="events">
          <Title level={3} className="events-title">Berita dan Acara</Title>
          <Carousel autoplay>
            {eventChunks.map((chunk, index) => (
              <div key={index} style={{ padding: '20px' }}>
                <Row gutter={[16, 16]} justify="center">
                  {chunk.map((event, i) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={i}>
                      <Card
                        hoverable
                        cover={<img alt={event.title} src={event.image} className="event-image" />}
                        className="event-card"
                      >
                        <Title level={4}>{event.title}</Title>
                        <p>{event.description}</p>
                        <p className="event-date">{event.date}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </Carousel>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 Fakultas Sains dan Teknologi UIN Bandung</Footer>
    </Layout>
  );
};

export default Home;
