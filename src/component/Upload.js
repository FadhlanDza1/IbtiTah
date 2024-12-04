import React from "react";
import NavigationDrawer from "./NavigationDrawer";
import { Input, Button, Form, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../style/upload.css";
import api from "../Connection/api"
import "../style/background.css"


const Upload = () =>{
  const userId = localStorage.getItem("userId")
  console.log(userId)
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
        
      }else{
        message.error("Kelasahan Upload")
      }

    } catch (error) {
      message.error(`kesalahan upload code`, error)
    }
  }
    const [form] = Form.useForm();
    return(
        <div className="bg-layout">
        <NavigationDrawer />
        <div className="bg-container-content">
          <h2 className="bg-title ">Upload</h2>
          <div className="bg-table-wrapper">
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
        </div>
      </div>
    )
}
export default Upload;