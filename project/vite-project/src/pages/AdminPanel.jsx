import React, { useState } from "react";
import { Layout, Menu, Table, Button, Modal, Form, Input } from "antd";

const { Header, Content, Sider } = Layout;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Локальные данные
  const [data, setData] = useState({
    users: [
      { id: 1, login: "admin", role_id: 1, password: "admin", donat_id: 1 },
      { id: 2, login: "user", role_id: 2, password: "user", donat_id: 1 },
      { id: 3, login: "Slava", role_id: 2, password: "Slava", donat_id: 1 },
    ],
    roles: [
      { id: 1, name: "Admin" },
      { id: 2, name: "User" },
    ],
    donats: [
      { id: 1, name: "крутой", description: "крутой" },
      { id: 2, name: "некрутой", description: "некрутой" },
    ],
    news: [
      { id: 1, name: "1", description: "1", date: "2024-12-04" },
      { id: 2, name: "2", description: "2", date: "2024-12-03" },
    ],
    employees: [
      {
        id: 1,
        user_id: 3,
        fio: "Слава",
        email: "Слава@gmail.com",
        phone_number: "1234567890",
      },
    ],
  });

  // Обработчики
  const handleAddEdit = (values) => {
    if (isEditing) {
      const updatedData = data[activeTab].map((item) =>
        item.id === editingRecord.id ? { ...editingRecord, ...values } : item
      );
      setData((prev) => ({ ...prev, [activeTab]: updatedData }));
      setIsEditing(false);
    } else {
      const newData = [...data[activeTab], { id: Date.now(), ...values }];
      setData((prev) => ({ ...prev, [activeTab]: newData }));
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const newData = data[activeTab].filter((item) => item.id !== id);
    setData((prev) => ({ ...prev, [activeTab]: newData }));
  };

  // Колонки для таблиц
  const columns = {
    users: [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Login", dataIndex: "login", key: "login" },
      { title: "Role ID", dataIndex: "role_id", key: "role_id" },
      { title: "Password", dataIndex: "password", key: "password" },
      { title: "Donat ID", dataIndex: "donat_id", key: "donat_id" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    roles: [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    donats: [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Description", dataIndex: "description", key: "description" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    news: [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Description", dataIndex: "description", key: "description" },
      { title: "Date", dataIndex: "date", key: "date" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    employees: [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "User_ID", dataIndex: "user_id", key: "user_id" },
      { title: "FIO", dataIndex: "fio", key: "fio" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Phone Number", dataIndex: "phone_number", key: "phone_number" },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" width={200}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={({ key }) => setActiveTab(key)}
        >
          <Menu.Item key="users">Users</Menu.Item>
          <Menu.Item key="roles">Roles</Menu.Item>
          <Menu.Item key="donats">Donations</Menu.Item>
          <Menu.Item key="news">News</Menu.Item>
          <Menu.Item key="employees">Employees</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#001529", color: "#fff" }}>
          Admin Panel
        </Header>
        <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
          <Button
            type="primary"
            onClick={() => {
              setIsEditing(false);
              form.resetFields();
              setIsModalOpen(true);
            }}
            style={{ marginBottom: "16px" }}
          >
            Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Button>
          <Table
            dataSource={data[activeTab]}
            columns={columns[activeTab]}
            rowKey="id"
          />
        </Content>
      </Layout>
      <Modal
        title={`${isEditing ? "Edit" : "Add"} ${activeTab}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddEdit}>
          {Object.keys(data[activeTab][0] || {})
            .filter((key) => key !== "id")
            .map((key) => (
              <Form.Item
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                rules={[{ required: true, message: `Enter ${key}` }]}
              >
                <Input />
              </Form.Item>
            ))}
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminPanel;
