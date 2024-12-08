import React, { useState } from "react";
import { Form, Input, Button, Radio, Typography, message } from "antd";
import "../style/login.css";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import api from "../Connection/api";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [refValue, setRefValue] = useState("student"); 
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        username: values.username,
        password: values.password,
        ref: refValue,
      };

      const response = await api.post("/login", payload)
      console.log(response)
      if (response.status === 200) {
        await message.success("Login berhasil!");
        const user = response.data.user;
        const userId = user.id
        const roleUser = user.role
        console.log(userId, roleUser)
        localStorage.setItem("userId", userId)
        localStorage.setItem("roleUser", roleUser)
        if (roleUser === "ADMIN") {
          navigate("/admin/list/mentors")
        }else{
          navigate("/dasboard")
        }
      } else {
        message.error(response.data?.message || "Login gagal. Periksa data Anda.");
      }
    } catch (err) {
      message.error(`Terjadi kesalahan. Coba lagi nanti.`);
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
    <NavigationBar/>
    <div className="login-container">
      <div className="login-box">
        <Title level={2} className="login-title">
          Login
        </Title>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Input for Username */}
          <Form.Item
            label="NIM"
            name="username"
            rules={[
              {
                required: true,
                message: "Silakan masukkan NIM/NIP Anda!",
              },{
                min:10,
                message:"NIM/NIP kurang"
              }
            ]}
          >
            <Input placeholder="Masukkan UnserName (NIM/NIP) Anda" />
          </Form.Item>

          {/* Input for Password */}
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

          {/* Radio Buttons for 'ref' */}
          <Form.Item label="Role :">
            <Radio.Group
              onChange={(e) => setRefValue(e.target.value)}
              value={refValue}
            >
              <Radio value="student">Mahasiswa</Radio>
              <Radio value="MENTOR">Mentor</Radio>
              <Radio value="ADMIN">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Register Link */}
        <div className="register-link">
          <Text>
            Belum register? <a href="/register">Daftar</a>
          </Text>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
