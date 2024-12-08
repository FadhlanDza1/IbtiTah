import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Select, message } from "antd";
import "../style/register.css";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import api from "../Connection/api";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await api.get("/mentor/MENTOR")
        if (response.status === 200 && Array.isArray(response.data.mentors)) {
          setMentors(response.data.mentors);
        } else {
          message.error("Gagal memuat daftar mentor.");
          console.log(response.message)
        }
      } catch (err) {
        message.error("Terjadi kesalahan saat memuat mentor.");
        console.log(err);
      }
    };

    fetchMentors();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let payload = {
        username: values.username,
        password: values.password,
        ref: "student",
        studentMentor: values.mentorName || null, // Menggunakan mentorId yang dipilih
      };

      const response = await api.post("/student/register", payload);

      if (response.status === 200) {
        message.success("Registrasi berhasil!");
        navigate("/login");
      } else {
        message.error("Registrasi gagal. Periksa data Anda.");
      }
    } catch (err) {
      message.error("Terjadi kesalahan. Coba lagi nanti.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Form tidak valid. Lengkapi semua data.");
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <NavigationBar />
      <div className="register-container">
        <div className="register-box">
          <Title level={2} className="register-title">
            Register
          </Title>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {/* Input Username */}
            <Form.Item
              label="NIM"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Silakan masukkan NIM Anda!",
                },
                {
                  min:10,
                  max:10,
                  message:"NIM yang anda masukan Kurang atau lebih"
                }
              ]}
            >
              <Input placeholder="Masukkan NIM Anda" />
            </Form.Item>

            <Form.Item
            label="Pilih Mentor Anda"
            name="mentorName"
            rules={[
              {
                required: true,
                message: "Silahkan Pilih Mentor Anda!"
              }
            ]}
            >
              <Select placeholder="Pilih Mentor Anda">
                {mentors.length === 0?(
                  <Option disable>Data Mentor Tidak Tersedia</Option>):
                  (mentors.map((mentor) =>(
                    <Option key={mentor.mentorName} value={mentor.mentorName}>
                      {mentor.mentorName || "Nama Mentor Tidak Tersedia"}
                    </Option>
                  ))
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Silakan masukkan password Anda!",
                },
              ]}
            >
              <Input.Password placeholder="Masukkan password Anda" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          {/* Link ke halaman Login */}
          <div className="login-link">
            <Text>
              Sudah punya akun? <a href="/login">Login di sini</a>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
