import { Input, Button, Col, Form, message, Modal, Row, Table, Typography, Select } from "antd";
import React, { useEffect, useState } from "react";
import "../style/background.css"
import api from "../Connection/api";
import { useNavigate } from "react-router-dom";

const {Title} = Typography
const { Option } = Select;
const ListMentors = () =>{
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [mentors,setMentors] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const roleUser = "Mentor"//localStorage.getItem("roleUser")
    console.log(roleUser)
    if (roleUser !== "ADMIN") {
        navigate("/login")
    }
    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            align: "center"
        },
        {
            title: "NIP",
            dataIndex: "mentorId",
            key: "mentorId",
            align: "center"
        },
        {
            title: "Nama Mentor",
            dataIndex: "mentorName",
            key: "mentorName",
            align: "center",
        },
        {
            title: "Contact",
            dataIndex: "mentorContact",
            key: "mentorContact",
            align: "center",
        },
        {
            title:"Role",
            dataIndex:"role",
            key:"role",
            align:"center",
            render: (role, record) =>
            (
                <Select
                defaultValue={role}
                style={{ width: 120 }}
                onChange = {(newRole) => updateRoleUser({ role: newRole }, record.mentorId)}
                >
                    <Option value = "MENTOR">Mentor</Option>
                    <Option value = "ADMIN">Admin</Option>
                </Select>
            )
        }
    ]
    const fetchMentor = async() =>{
        setLoading(true)
        try {
            const response = await api.get(`/admin/staff/ADMIN`)
            const dataMentors = response.data.staffs
            if (response.status === 200) {
                const mapData = dataMentors.map((item, index) =>({
                    key: item._id,
                    no: index + 1,
                    mentorId:item.mentorId,
                    mentorName:item.mentorName||null,
                    mentorContact:item.mentorContact||null,
                    role:item.role
                }))
                setMentors(mapData)
                message.success("Data Berhasil Dimuat!")
            } else {
                message.error("terjadi kesalahan dalam pengambilan data")
            }
            
        } catch (error) {
            message.error("terjadi kesalahan dalam pengambilan data")
            console.log(error.message)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() =>{
        fetchMentor()
    },[])
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); 
    };
    const handleLogout =()=>{
        localStorage.removeItem("role")
        navigate("/login")
    }
    const createMentor = async(values) =>{  
        const payload = {
            id:values.id,
            name: values.name,
            contact: values.contact,
            password: values.password,
            role:"ADMIN"
        }
        try {
            const response = await api.post("/admin/create", payload) 
            if (response.ok) {
                message.success("Berhasil Menambahkan Mentor")
                console.log(response.data)
            } else {
                message.error("Terjadi kesalahan. Coba lagi nanti.")
                console.log(response.data)
            }
        } catch (error) {
            message.error("Terjadi kesalahan. Coba lagi nanti.");
            console.log(error.message);
        } finally {
            form.resetFields();
            setIsModalVisible(false)
        }
    }
    const updateRoleUser = async(updateUser,mentorId) =>{
        try {
            const response = await api.put(`/admin/${mentorId}/change-role`, updateUser)
            message.success("Role updated successfully!")
            console.log(response.data)
        } catch (error) {
            console.log("Error updating")
        }
    }

    return(
        <Row className="bg-layout">
            <Col md={{span:24}}lg={{span: 24}} xl={{span: 24}} xxl={{span: 24}}>
            <Button
            color="danger"
            variant="solid"
            >Logout!</Button>
                <Row className="bg-container-content">
                    <Col xs={{span:24}} sm={{span:24}} md={{span:19}} lg={{span: 20}} xl={{span: 21}} xxl={{span: 22}}>
                    <Title className="bg-title">Daftar Mentor</Title>
                    </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:5}} lg={{span: 4}} xl={{span: 3}} xxl={{span: 1}} style={{"marginTop": "20px"}}>
                    <Button
                    color="primary"
                    variant="solid"
                    onClick={showModal}
                    >Tambah Mentor</Button>
                    </Col>
                    <Modal
                    title="Tambah Mentor"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose
                    >
                        <Form
                        form={form}
                        layout="vertical"
                        onFinish={createMentor}
                        >
                            <Form.Item
                            label = "NIP"
                            name="id"
                            rules={[{ required: true, message: 'NIP Mentor wajib diisi' }]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                            label = "Nama Mentor"
                            name="name"
                            rules={[{ required: true, message: 'Nama Mentor wajib diisi' },
                                {
                                    min:18,
                                    message:"NIP kurang panjang"
                                }
                            ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                            label = "Contact Mentor"
                            name="contact"
                            rules={[{ required: true, message: 'Contact Mentor wajib diisi' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                            label = "Password"
                            name="password"
                            rules={[{ required: true, message: 'Password untuk Mentor wajib diisi' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Simpan
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                            Batal
                            </Button>
                        </Form.Item>
                        </Form>
                    </Modal>
                    <div className="bg-table-wrapper">
                        <Table
                        columns={columns}
                        dataSource={mentors}
                        loading = {loading}
                        pagination={{position:["bottomCenter"], pagination:8}}
                        scroll={{ x: 'max-content' }}
                        bordered/>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}
export default ListMentors;