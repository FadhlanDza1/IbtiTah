import React, { useState, useEffect } from "react";
import { Table, Button, message, Select,Row, Col, Space, Typography   } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../style/dasboard.css"; // Fixed typo in the filename (dasboard -> dashboard)
import NavigationDrawer from "./NavigationDrawer";
import api from "../Connection/api";
import { Navigate } from "react-router-dom";

import "../style/background.css"
import { useDrawer } from "../contrext/DrawerContext";
const { Title } = Typography;
const { Option } = Select;

const Dashboard = () => {
  const [recites, setRecites] = useState([]); // Data untuk tabel
  const [loading, setLoading] = useState(false); // Loading state
  const userId = localStorage.getItem("userId"); // Mendapatkan userId
  const roleUser = localStorage.getItem("roleUser"); // Mendapatkan role user

  const {isDrawerVisible} = useDrawer()


  const getEndpoint = (id) => {
    // Determine endpoint based on roleUser
    if (roleUser === "MENTOR") {
      return `/mentor/${id}/recites/MENTOR`;
    }
    return `/student/${id}/recite`; // Fixed endpoint for student role
  };

  const fetchRecites = async () => {
    setLoading(true);
    try {
      const response = await api.get(getEndpoint(userId));
      const { recites } = response.data;
  
      const mappedRecites = recites.map((item, index) => ({
        key: item._id,
        no: index + 1,
        tanggal: new Date(item.createdAt).toLocaleDateString("id-ID"),
        surah: `${item.reciteSurah} (${item.reciteAyat})`,
        link: item.reciteLink,
        status: item.reciteStatus || "PENDING", // Default ke PENDING jika tidak ada data
        reciteReview: item.reciteReview || "-", // Default ke "-"
        reciteScore: item.reciteScore || 0, // Default ke 0
      }));
  
      setRecites(mappedRecites);
      message.success("Data berhasil dimuat!");
    } catch (error) {
      console.error("Error fetching recites:", error);
      message.error("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!userId) {
      <Navigate to="/login" />;
    }else{
      fetchRecites()
    }
    
  },[]);

  // Fungsi untuk menghapus data
  const handleDelete = async (reciteId) => {
    try {
      await api.delete(`/student/${userId}/recite/${reciteId}`);
      message.success("Data berhasil dihapus.");
      fetchRecites(); // Refresh tabel setelah data dihapus
    } catch (error) {
      console.error("Error deleting recite:", error);
      message.error("Gagal menghapus data.");
    }
  };

  const handleStatusChange = async (updatedValues, reciteId) => {
    try {
      await api.post(`/mentor/${reciteId}/review/MENTOR`, updatedValues);
      message.success("Status berhasil diperbarui.");
      fetchRecites();
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      message.error("Gagal memperbarui status.");
    }
  };
  
  
  
  // Kolom Tabel
  const columns = [
    { title: "No", dataIndex: "no", key: "no", align: "center" },
    { title: "Tanggal", dataIndex: "tanggal", key: "tanggal", align: "center" },
    { title: "Surah & Ayat", dataIndex: "surah", key: "surah", align: "center" },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      align: "center",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, record) =>
        roleUser === "MENTOR" ? (
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={(newStatus) =>
              handleStatusChange(
                {
                  reciteStatus: newStatus,
                  reciteReview: record.reciteReview,
                  reciteScore: record.reciteScore,
                },
                record.key
              )
            }
          >
            <Option value="PENDING">PENDING</Option>
            <Option value="REVIEWED">REVIEWED</Option>
          </Select>
        ) : (
          <span style={{ color: status === "PENDING" ? "orange" : "green" }}>{status}</span>
        ),
    },
    {
      title: "Review",
      dataIndex: "reciteReview",
      key: "reciteReview",
      align: "center",
      render: (review, record) =>
        roleUser === "MENTOR" ? (
          <Select
            defaultValue={review}
            style={{ width: 120 }}
            onChange={(newReview) =>
              handleStatusChange(
                {
                  reciteStatus: record.status,
                  reciteReview: newReview,
                  reciteScore: record.reciteScore,
                },
                record.key
              )
            }
          >
            <Option value="Sangat baik">Sangat baik</Option>
            <Option value="Baik">Baik</Option>
            <Option value="Cukup Baik">Cukup Baik</Option>
            <Option value="Cukup">Cukup</Option>
            <Option value="Kurang">Kurang</Option>
          </Select>
        ) : (
          <span>{review}</span>
        ),
    },
    {
      title: "Nilai",
      dataIndex: "reciteScore",
      key: "reciteScore",
      align: "center",
      render: (score, record) =>
        roleUser === "MENTOR" ? (
          <Select
            defaultValue={score}
            style={{ width: 120 }}
            onChange={(newScore) =>
              handleStatusChange(
                {
                  reciteStatus: record.status,
                  reciteReview: record.reciteReview,
                  reciteScore: newScore,
                },
                record.key
              )
            }
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        ) : (
          <span>{score}</span>
        ),
    },
  ];
  
  if (roleUser === "student") {
    columns.push({
      title: "Act",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    });
  }

  return (
    <Row className="bg-layout">
      {isDrawerVisible ?
      <Col md={{span:7}} lg={{span: 6}} xl={{span: 4}} xxl={{span: 3}}>
      <NavigationDrawer/>
    </Col>:<Col lg={{span: 1}} xl={{span: 1}} xxl={{span: 1}}>
      <NavigationDrawer/>
    </Col>
      }
      {isDrawerVisible ?
      <Col md={{span:16}}lg={{span: 17}} xl={{span: 19}} xxl={{span: 20}}>
      <Space
      direction="vertical"
      size="middle"
      className="bg-container-content"
      >
        <Title className="bg-title">Dashboard</Title>
        <div className="bg-table-wrapper">
        <Table
            columns={columns}
            dataSource={recites}
            loading={loading}
            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
            bordered
            scroll={{ x: 'max-content' }}
          />
          </div>
      </Space>
      </Col>:<Col md={{span:24}} lg={{span: 24}} xl={{span: 24}} xxl={{span: 24}}>
      <Space
      direction="vertical"
      size="middle"
      className="bg-container-content"
      >
        <Title className="bg-title">Dashboard</Title>
        <div className="bg-table-wrapper">
        <Table
            columns={columns}
            dataSource={recites}
            loading={loading}
            pagination={{ position: ["bottomCenter"], pageSize: 10 }}
            bordered
            scroll={{ x: 'max-content' }}
          />
          </div>
      </Space>
      </Col>
    }
      
    </Row>
  );
};

export default Dashboard;
