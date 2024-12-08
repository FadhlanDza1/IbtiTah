import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Avatar, message, Row, Col, Space, Typography, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../style/profile.css";
import "../style/background.css"
import api from "../Connection/api";
import NavigationDrawer from "./NavigationDrawer";
import { useDrawer } from "../contrext/DrawerContext";
import axios from "axios";

const {Title} = Typography


const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const [dataProfile, setDataProfile] = useState(null);
  const [loading, setLoading] = useState(false)
  const userId = localStorage.getItem("userId");
  const roleUser = localStorage.getItem("roleUser"); 
  const {isDrawerVisible} = useDrawer()
  const getEndpoint = (id) => (roleUser === "MENTOR" ? `/mentor/${id}/MENTOR` : `/student/${id}`);

  const handleUpdateProfile = async (values) => {
    try {
      const payload =
        roleUser === "MENTOR"
          ? {
              mentorName: values.userName,
              mentorContact: values.userContact,
              password: values.password,
              photoUrl:imageUrl
            }
          : {
              studentName: values.userName,
              studentContact: values.userContact,
              studentMajor: values.userMajor,
              password: values.password,
              photoUrl:imageUrl
            };

      const response = await api.put(getEndpoint(userId), payload);

      if (response.status === 200) {
        message.success("Profil berhasil diperbarui!");
        
      } else {
        message.error("Gagal memperbarui profil!");
        console.log(response.message)
      }
    } catch (error) {
      message.error("Terjadi kesalahan saat memperbarui profil!");
      console.log(error)
    }finally{
      form.resetFields();
      feacthProfile();
    }
  };

  const handleUpload = async(info) => {
    setLoading(true)
    if (info.file.status === "done") {
      const uploadedImageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(uploadedImageUrl);
      message.success(`${info.file.name} berhasil diunggah!`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} gagal diunggah!`);
    }
    // Membuat objek FormData untuk mengirimkan file ke Cloudinary
    const formData = new FormData();

    formData.append("file", info.file);
    formData.append("upload_preset", "jc6bfdpu");  // Ganti dengan upload preset Anda
    formData.append("cloud_name", "dlzbdofko");  // Ganti dengan cloud name Anda
    try {
      
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlzbdofko/image/upload", 
        formData
      );

      console.log(response.data.url)
      const uploadedImageUrl = response.data.url

      setImageUrl(uploadedImageUrl)
      message.success("berhasil upload gambar")
      setDataProfile((prevProfile) => ({
        ...prevProfile,
        photoUrl: uploadedImageUrl,  // Update photoUrl di dataProfile
      }));
      setLoading(false)
    } catch (error) {
      message.error("Upload failed!");
    }

  };
  const feacthProfile =async()=>{
    const response = await api.get(getEndpoint(userId))
    const data = response.data.mentor? response.data.mentor: response.data.student
    setDataProfile(data)
    
    setLoading(false)
  }
  useEffect(()=>{
    setLoading(true)
    feacthProfile()
  },[])

  return (
    <Row className="bg-layout">
      {isDrawerVisible?
        <Col md={{span:7}} lg={{span:6}} xl={{span:4}} xxl={{span:3}}>
        <NavigationDrawer/>
        </Col>:<Col md={{span:1}} lg={{span: 1}} xl={{span: 1}} xxl={{span:1}}>
        <NavigationDrawer/>
        </Col>
      }
      {isDrawerVisible ?
      <Col md={{span:16}}lg={{span: 17}} xl={{span: 19}} xxl={{span: 20}}>
      <Space
      direction="vertical"
      size="middle"
      className="bg-container-content">
        <Title className="bg-title">Profile</Title>
        {dataProfile == null ? <Spin/>: 
        <div className="profile-card">
          <div className="profile-row">
            <div className="profile-avatar-container">
              <Avatar
                size={150}
                shape="square"
                src={imageUrl || dataProfile.photoUrl}
                alt="Profile Avatar"
                className="profile-avatar"
              />
              <Upload
                name="profile"
                accept="image/*"
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => onSuccess("ok"), 1000);
                  handleUpload({ file, status: "done" });
                }}
              >
                <Button icon={<UploadOutlined />} className="upload-avatar-button">
                  Upload Gambar
                </Button>
              </Upload>
            </div>

            {/* Bagian Kanan: Form */}
           
            <div className="profile-form-container">
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
                initialValues={{
                  userName: roleUser === "MENTOR" ? dataProfile.mentorName|| "" : dataProfile.studentName|| "",
                  userContact:roleUser === "MENTOR" ? dataProfile.mentorContact|| "" : dataProfile.studentContact|| "",
                  userMajor: roleUser === "student" ? dataProfile.studentMajor|| "" : undefined,
                  password: "",
                }}
              >
                <Form.Item label="Nama" name="userName">
                  <Input placeholder="Masukkan Nama" />
                </Form.Item>
                <Form.Item label="Kontak" name="userContact">
                  <Input placeholder="Masukkan Kontak" />
                </Form.Item>
                {roleUser === "student" && (
                  <Form.Item label="Jurusan" name="userMajor">
                    <Input placeholder="Masukkan Jurusan" />
                  </Form.Item>
                )}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Masukkan Password!" }]}
                >
                  <Input.Password placeholder="Masukkan Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="upload-button">
                    Update Profil
                  </Button>
                </Form.Item>
              </Form>
              
            </div>
          </div>
        </div>
      }
      </Space>
      </Col>:
      <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
      <Space
      direction="vertical"
      size="middle"
      className="bg-container-content">
        <Title className="bg-title">Profile</Title>
        {dataProfile == null ? <Spin/>: 
        <div className="profile-card">
          <div className="profile-row">
            <div className="profile-avatar-container">
              <Avatar
                size={150}
                shape="square"
                src={dataProfile.photoUrl}
                alt="Profile Avatar"
                className="profile-avatar"
              />
              <Upload
                name="profile"
                accept="image/*"
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => onSuccess("ok"), 1000);
                  handleUpload({ file, status: "done" });
                }}
              >
                <Button icon={<UploadOutlined />} className="upload-avatar-button">
                  Upload Gambar
                </Button>
              </Upload>
            </div>
            
            <div className="profile-form-container">  
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
                initialValues={{
                  userName: roleUser === "MENTOR" ? dataProfile.mentorName|| "" : dataProfile.studentName|| "",
                  userContact:roleUser === "MENTOR" ? dataProfile.mentorContact|| "" : dataProfile.studentContact|| "",
                  userMajor: roleUser === "student" ? dataProfile.studentMajor|| "" : undefined,
                  password: "",
                }}
              >
                <Form.Item label="Nama" name="userName">
                  <Input placeholder="Masukkan Nama" />
                </Form.Item>
                <Form.Item label="Kontak" name="userContact">
                  <Input placeholder="Masukkan Kontak" />
                </Form.Item>
                {roleUser === "student" && (
                  <Form.Item label="Jurusan" name="userMajor">
                    <Input placeholder="Masukkan Jurusan" />
                  </Form.Item>
                )}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Masukkan Password!" }]}
                >
                  <Input.Password placeholder="Masukkan Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="upload-button">
                    Update Profil
                  </Button>
                </Form.Item>
              </Form>
            </div>
          
          </div>
        </div>
        }
      </Space>
      </Col>
    }
    </Row>
        
    //   </div>
    // </div>
  );
};

export default Profile;
