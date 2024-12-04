import React, { useEffect, useState } from "react";
import NavigationDrawer from "./NavigationDrawer";
import "../style/background.css"
import api from "../Connection/api";
import { useNavigate } from "react-router-dom";
import { message, Table } from "antd";

const AllMahasiswa= () =>{
    const [student, setStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const fetchStudent = async () =>{
        setLoading(true)
        try {
            const response = await api.get(`mentor/${userId}/students`)
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
        <div className="bg-layout">
            <NavigationDrawer/>
                <div className="bg-container-content">
                <h2 className="bg-title ">Daftar Mahasiswa</h2>
                    <div className="bg-table-wrapper">
                    <Table
                            columns={columns}
                            dataSource={student}
                            loading={loading}
                            pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                            bordered
                        />
                    </div>
                </div>
        </div>
    )
}
export default AllMahasiswa;