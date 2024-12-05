import React from "react";
import NavigationDrawer from "./NavigationDrawer";
import "../style/FAQ.css"
import "../style/background.css"
import { Divider,Row, Col, Typography, Space } from "antd";
import { useDrawer } from "../contrext/DrawerContext";

const {Title} = Typography
const question=[
    {
        pertanyaan: "Apa Hal yang pertama kali dilakukan ketika masuk dan daftar di web ini?",
        jawaban: "Edit profile untuk menambahkan nama dan jurusan anda agar dapat dilihat oleh mentor"
    },
    {
        pertanyaan: "Apa saja komponen penilaian yang digunakan?",
        jawaban: "Komponen penilaian meliputi video yang jelas, bacaan yang fasih dan dapat dimengerti"
    },
]


const FAQ = () =>{
    const {isDrawerVisible} = useDrawer()
    return(
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
                <Title className="bg-title">FAQ (Frequently and Question)</Title>
                <div className="bg-table-wrapper">
                    {question.map((item, index) => (
                        <div key={index}>
                            <h2 className="question-content">{item.pertanyaan}</h2>
                            <p className="answer-content">{item.jawaban}</p>
                            <Divider/>
                        </div>
                        
                    ))}
                </div>
                </Space>
                </Col>:
                <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                <Space 
                direction="vertical"
                size="middle"
                className="bg-container-content">
                <Title className="bg-title">FAQ (Frequently and Question)</Title>
                <div className="bg-table-wrapper">
                    {question.map((item, index) => (
                        <div key={index}>
                            <h2 className="question-content">{item.pertanyaan}</h2>
                            <p className="answer-content">{item.jawaban}</p>
                            <Divider/>
                        </div>
                        
                    ))}
                </div>
                </Space>
                </Col>

            }
        
        </Row>
    )
}

export default FAQ;