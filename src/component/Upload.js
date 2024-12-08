import React from "react";
import NavigationDrawer from "./NavigationDrawer";
import { Input, Button, Form, message,Row, Col, Space, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../style/upload.css";
import api from "../Connection/api"
import "../style/background.css"
import { useDrawer } from "../contrext/DrawerContext";
const {Title} = Typography



const Upload = () =>{
  const userId = localStorage.getItem("userId")
  const {isDrawerVisible} = useDrawer()
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    
    try {
      const payload ={
        id: userId,
        data: {
          reciteSurah: values.surah,
          reciteAyat: values.ayat,
          reciteLink: values.link,

        },
      };
      
      const response = await api.post("/student/uploadRecite", payload);
      if (response.status === 200) {
        console.log("Data berhasil diupload", response.data)
        message.success("Data Berhasil Diupload")
        form.resetFields();
      }else{
        message.error("Kelasahan Upload")
        console.log(response)
      }

    } catch (error) {
      message.error(`kesalahan upload`)
      console.log(error)
    }
  }

    return(
      <Row className="bg-layout">
        {isDrawerVisible ?
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
        <Title className="bg-title">Upload</Title>
         <div className="table-wrapper">
           <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="upload-form"
            >
              <div className="form-row">
                <Form.Item
                  name="surah"
                  label="Surah"
                  rules={[{ required: true, message: "Masukkan Surah!" }]}
                >
                  <Input placeholder="Masukkan Surah" />
                </Form.Item>
                <Form.Item
                  name="ayat"
                  label="Ayat"
                  rules={[{ required: true, message: "Masukkan Ayat!" }]}
                >
                  <Input placeholder="Masukkan Ayat" />
                </Form.Item>
              </div>
              {/* <DatePicker onChange={onChange} needConfirm /> */}
              <Form.Item
                name="link"
                label="Link"
                rules={[{ required: true, message: "Masukkan Link!" },
                  {
                    validator: (_, value) =>
                      value && /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(value)
                        ? Promise.resolve()
                        : Promise.reject("Masukkan link YouTube yang valid!"),
                  },
                ]}
              >
                <Input
                  placeholder="Masukkan Link"
                  addonAfter={<UploadOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="upload-button"
                >
                  Upload
                </Button>
              </Form.Item>
            </Form>
            </div>

      </Space>
      </Col>:<Col md={{span:24}} lg={{span: 24}} xl={{span: 24}} xxl={{span: 24}}>
      <Space
      direction="vertical"
      size="middle"
      className="bg-container-content">
        <h2 className="bg-title">Upload</h2>
         <div className="table-wrapper">
           <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="upload-form"
            >
              <div className="form-row">
                <Form.Item
                  name="surah"
                  label="Surah"
                  rules={[{ required: true, message: "Masukkan Surah!" }]}
                >
                  <Input placeholder="Masukkan Surah" />
                </Form.Item>
                <Form.Item
                  name="ayat"
                  label="Ayat"
                  rules={[{ required: true, message: "Masukkan Ayat!" }]}
                >
                  <Input placeholder="Masukkan Ayat" />
                </Form.Item>
              </div>
              {/* <DatePicker onChange={onChange} needConfirm /> */}
              <Form.Item
                name="link"
                label="Link"
                rules={[{ required: true, message: "Masukkan Link!" }]}
              >
                <Input
                  placeholder="Masukkan Link"
                  addonAfter={<UploadOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="upload-button"
                >
                  Upload
                </Button>
              </Form.Item>
            </Form>
            </div>

      </Space>
      </Col>}
      </Row>
    )
}
export default Upload;