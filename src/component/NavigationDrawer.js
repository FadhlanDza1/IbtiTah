import React from "react";
import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  CloudUploadOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  LoginOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "../style/navigationDrawer.css"; // Import file CSS untuk styling
import logo from "../images/Avatar.png";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../contrext/DrawerContext";

const NavigationDrawer = () => {
  const navigate = useNavigate();

  const {isDrawerVisible,toggleDrawer} = useDrawer();

  const role = localStorage.getItem("roleUser");

  const handleMenuClick=(path)=>{
    navigate(path)
    toggleDrawer()
  }
  const handleLogout = () => {
    // Hapus userId dan role dari localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    // Arahkan ke halaman login
    navigate("/login");
  };

  // Menu untuk mahasiswa
  const studentMenu = (
    <Menu mode="vertical" className="drawer-menu">
      <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() =>handleMenuClick("/dasboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<CloudUploadOutlined />} onClick={() =>handleMenuClick("/upload")}>
        Upload
      </Menu.Item>
      <Menu.Item key="3" icon={<ProfileOutlined />} onClick={() =>handleMenuClick("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="4" icon={<QuestionCircleOutlined />} onClick={() =>handleMenuClick("/FAQ")}>
        FAQ
      </Menu.Item>
      <Menu.Item key="5" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Menu untuk mentor
  const mentorMenu = (
    <Menu mode="vertical" className="drawer-menu">
      <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() =>handleMenuClick("/dasboard")}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />} onClick={() =>handleMenuClick("/mentor/list/Mahasiswa")}>
        Mahasiswa
      </Menu.Item>
      <Menu.Item key="3" icon={<ProfileOutlined />} onClick={() =>handleMenuClick("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="4" icon={<QuestionCircleOutlined />} onClick={() =>handleMenuClick("/FAQ")}>
        FAQ
      </Menu.Item>
      <Menu.Item key="5" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const adminMenu =(
    <Menu mode="vertical" className="drawer-menu">
      <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() =>handleMenuClick("/dasboard")}>
        Mentor
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />} onClick={() =>handleMenuClick("/daftarMahasiswa")}>
        Staff
      </Menu.Item>
      <Menu.Item key="5" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {isDrawerVisible && (
        <div className="drawer-container">
          {/* Tombol Tutup */}
          <Button
            icon={<CloseOutlined />}
            shape="circle"
            className="close-button"
            onClick={toggleDrawer}
          />

          {/* Logo dan Nama */}
          <div className="drawer-logo">
            <img
              src={logo} // Ganti dengan URL logo Anda
              alt="Logo"
              className="drawer-logo-image"
            />
            <h3 className="drawer-title">IbTiTah</h3>
            <p className="drawer-subtitle">Fakultas Sains dan Teknologi</p>
            
          </div>

          {/* Menu berdasarkan role */}
          {role === "MENTOR" ? mentorMenu : studentMenu}
          <div className="drawer-text-copy">
            2024 Fakultas Sains & Teknologi <br/>UIN Sunan Gunung Djati Bandung
          </div>
        </div>

      )}
      {!isDrawerVisible && (
        <Button
          className="open-button"
          shape="circle"
          onClick={toggleDrawer}
        >☰</Button>
      )}
    </>
  );
};

export default NavigationDrawer;
