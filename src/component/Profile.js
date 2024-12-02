import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Avatar, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../style/profile.css";
import api from "../Connection/api";
import NavigationDrawer from "./NavigationDrawer";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const studentName = localStorage.getItem("studentName")
  const studentContact = localStorage.getItem("studentContact")
  const studentMajor = localStorage.getItem("studentMajor")
  const mentorName = localStorage.getItem("mentorName")
  const mentorContact = localStorage.getItem("mentorContact")
  const userId = localStorage.getItem("userId");
  const roleUser = localStorage.getItem("roleUser"); 


  const getEndpoint = (id) => (roleUser === "mentor" ? `/mentor/${id}` : `/student/${id}`);


  const handleUpdateProfile = async (values) => {
    try {
      const payload =
        roleUser === "mentor"
          ? {
              mentorName: values.userName,
              mentorContact: values.userContact,
              password: values.password,
            }
          : {
              studentName: values.userName,
              studentContact: values.userContact,
              studentMajor: values.userMajor,
              password: values.password,
            };

      const response = await api.put(getEndpoint(userId), payload);

      if (response.status === 200) {
        message.success("Profil berhasil diperbarui!");
      } else {
        message.error("Gagal memperbarui profil!");
      }
    } catch (error) {
      message.error("Terjadi kesalahan saat memperbarui profil!");
      console.error(error);
    }
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const uploadedImageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(uploadedImageUrl);
      message.success(`${info.file.name} berhasil diunggah!`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} gagal diunggah!`);
    }
  };

  return (
    <div className="dashboard-layout">
      <NavigationDrawer />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Profile</h2>
        <div className="profile-card">
          <div className="profile-row">
            <div className="profile-avatar-container">
              <Avatar
                size={150}
                shape="square"
                src={imageUrl || "https://via.placeholder.com/150"}
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
                  userName: roleUser === "mentor" ? mentorName|| "" : studentName|| "",
                  userContact:roleUser === "mentor" ? mentorContact|| "" : studentContact|| "",
                  userMajor: roleUser === "student" ? studentMajor|| "" : undefined,
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
      </div>
    </div>
  );
};

export default Profile;