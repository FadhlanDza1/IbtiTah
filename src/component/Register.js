import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Radio, Select, message } from "antd";
import "../style/register.css";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import api from "../Connection/api";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]); // State untuk daftar mentor
  const navigate = useNavigate();

  // Fetch data mentor dari backend
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await api.get("/mentor"); // Ganti endpoint jika diperlukan
        if (response.status === 200 && Array.isArray(response.data.mentors)) {
          setMentors(response.data.mentors);
        } else {
          message.error("Gagal memuat daftar mentor.");
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
        ref: values.ref,
        studentMentor: values.mentorName || null, // Menggunakan mentorId yang dipilih
      };

      const response = await api.post("/register", payload);

      if (response.status === 200) {
        message.success("Registrasi berhasil!");
        console.log(payload)
        navigate("/login"); // Arahkan ke halaman login setelah registrasi berhasil
      } else {
        message.error("Registrasi gagal. Periksa data Anda.");
      }
    } catch (err) {
      message.error("Terjadi kesalahan. Coba lagi nanti.");
      console.log(err);
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
                  message: "Silakan masukkan username Anda!",
                },
              ]}
            >
              <Input placeholder="Masukkan username Anda" />
            </Form.Item>

            {/* Radio Button Role */}
            <Form.Item
              label="Role"
              name="ref"
              rules={[
                {
                  required: true,
                  message: "Silakan pilih role Anda!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="student">Student</Radio>
                <Radio value="mentor">Mentor</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Dropdown Nama Mentor */}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.ref !== currentValues.ref
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("ref") === "student" && (
                  <Form.Item
                    label="Pilih Mentor"
                    name="mentorName"
                    rules={[
                      {
                        required: true,
                        message: "Silakan pilih mentor Anda!",
                      },
                    ]}
                  >
                    <Select placeholder="Pilih mentor Anda">
                      {mentors.length === 0 ? (
                        <Option disabled>Data mentor tidak tersedia</Option>
                      ) : (
                        mentors.map((mentor) => (
                          <Option key={mentor.mentorName} value={mentor.mentorName}>
                            {/* Menampilkan nama mentor */}
                            {mentor.mentorName || "Nama mentor tidak tersedia"}
                          </Option>
                        ))
                      )}
                    </Select>
                  </Form.Item>
                )
              }
            </Form.Item>

            {/* Input Password */}
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

            {/* Submit Button */}
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
