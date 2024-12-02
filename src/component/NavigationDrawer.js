
import React, { useState } from "react";
import { Menu, Button } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  CloudUploadOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  LoginOutlined,
  FolderOpenFilled,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "../style/navigationDrawer.css"; // Import file CSS untuk styling
import logo from "../images/Avatar.png";
import { Link, useNavigate } from "react-router-dom";

const NavigationDrawer = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(true);
  const navigate = useNavigate();

  // Ambil role dari localStorage
  const role = localStorage.getItem("roleUser");

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

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
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        Dashboard
        <Link to="/dasboard" />
      </Menu.Item>
      <Menu.Item key="2" icon={<CloudUploadOutlined />}>
        Upload
        <Link to="/upload" />
      </Menu.Item>
      <Menu.Item key="3" icon={<ProfileOutlined />}>
        Profile
        <Link to="/profile" />
      </Menu.Item>
      <Menu.Item key="4" icon={<QuestionCircleOutlined />}>
        FAQ
        <Link to="/FAQ"/>
      </Menu.Item>
      <Menu.Item key="5" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Menu untuk mentor
  const mentorMenu = (
    <Menu mode="vertical" className="drawer-menu">
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        Dashboard
        <Link to="/dasboard" />
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        Mahasiswa
        <Link to="/daftarMahasiswa" />
      </Menu.Item>
      <Menu.Item key="3" icon={<ProfileOutlined />}>
        Profile
        <Link to="/profile" />
      </Menu.Item>
      <Menu.Item key="4" icon={<QuestionCircleOutlined />}>
        FAQ
        <Link to="/FAQ"/>
      </Menu.Item>
      <Menu.Item key="5" icon={<LoginOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isDrawerVisible && (
        <div className="drawer-container">
          {/* Tombol Tutup */}
          <Button
            icon={<CloseOutlined />}
            shape="circle"
            className="close-button"
            onClick={closeDrawer}
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
          {role === "mentor" ? mentorMenu : studentMenu}
        </div>
      )}

      {/* Tombol Buka (opsional) */}
      {!isDrawerVisible && (
        <Button
          className="open-button"
          shape="circle"
          onClick={openDrawer}
        >☰</Button>
      )}
    </>
  );
};

export default NavigationDrawer;
