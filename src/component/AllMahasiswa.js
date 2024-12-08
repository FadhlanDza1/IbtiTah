import React, { useEffect, useState } from "react";
import NavigationDrawer from "./NavigationDrawer";
import "../style/background.css"
import api from "../Connection/api";
import { useNavigate } from "react-router-dom";
import { Col, message, Row, Space, Table, Typography } from "antd";
import { useDrawer } from "../contrext/DrawerContext";

const {Title} = Typography

const AllMahasiswa= () =>{
    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const {isDrawerVisible} = useDrawer()
    const fetchStudent = async () =>{
        setLoading(true)
        try {
            const response = await api.get(`mentor/${userId}/students/MENTOR`)
            const dataMahasiswa = response.data.students;
            console.log(dataMahasiswa)
            const mapData = dataMahasiswa.map((item, index) => ({
                key: item._id,
                no: index + 1,
                studentId: item.studentId,
                studentName: item.studentName||null,
                studentMajor: item.studentMajor||null,
                studentContact: item.studentContact||null
            }))
            console.log(mapData)
            setStudent(mapData)
            message.success("Data Berhasil Dimuat!")
        } catch (error) {
            message.error("Gagal Memuat Data!")

        } finally {
            setLoading(false)
        }
    }
    useEffect(() =>{
        if (!userId){
            navigate("/login")
        }else{
            fetchStudent()
        }
        
    },[])
    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            align: "center"
        },
        {
            title: "NIM",
            dataIndex: "studentId",
            key: "studentId",
            align: "center"
        },
        {
            title: "Nama Mahasiswa",
            dataIndex: "studentName",
            key: "studentName",
            align: "center",
            render: (text) => text || "Belum Diupdate oleh User"
        },
        {
            title: "Jurusan",
            dataIndex: "studentMajor",
            key: "studentMajor",
            align: "center",
            render: (text) => text || "Belum Diupdate oleh User"
        },
        {
            title: "Contact",
            dataIndex: "studentContact",
            key: "studentContact",
            align: "center",
            render: (text) => text || "Belum Diupdate oleh User"
        }
    ]
    return(
        <Row className="bg-layout">
            {isDrawerVisible ?
            <Col md={{span:7}} lg={{span:6}} xl={{span:4}} xxl={{span:3}}>
            <NavigationDrawer/>
            </Col>:
            <Col md={{span:1}} lg={{span: 1}} xl={{span: 1}} xxl={{span:1}}>
            <NavigationDrawer/>
            </Col>  
            }
            {isDrawerVisible?
            <Col md={{span:16}}lg={{span: 17}} xl={{span: 19}} xxl={{span: 20}}>
            <Space
            direction="vertical"
            size="middle"
            className="bg-container-content">
                <Title className="bg-title">Daftar Mahasiswa</Title>
                <div className="bg-table-wrapper">
                    <Table
                            columns={columns}
                            dataSource={student}
                            loading={loading}
                            pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                            scroll={{ x: 'max-content' }}
                            bordered
                        />
                    </div>
            </Space>
            </Col>:
            <Col md={{span:24}} lg={{span: 24}} xl={{span:24}} xxl={{span:24}}>
            <Space
            direction="vertical"
            size="middle"
            className="bg-container-content">
                <Title className="bg-title">Daftar Mahasiswa</Title>
                <div className="bg-table-wrapper">
                    <Table
                            columns={columns}
                            dataSource={student}
                            loading={loading}
                            pagination={{ position: ["bottomCenter"], pageSize: 8 }}
                            bordered
                        />
                    </div>
            </Space>
            </Col>
            }
        </Row>
    )
}
export default AllMahasiswa;