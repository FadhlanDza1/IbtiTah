import React from "react";
import NavigationDrawer from "./NavigationDrawer";
import "../style/FAQ.css"

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
    return(
        <div className="faq-layout">
            <NavigationDrawer/>
            <div className="faq-content">
                <h2 className="faq-title">FAQ (Frequently and Question)</h2>
                    {question.map((item, index) => (
                        <div className="content-card" key={index}>
                            <h2 className="question-content">{item.pertanyaan}</h2>
                            <p className="answer-content">{item.jawaban}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FAQ;