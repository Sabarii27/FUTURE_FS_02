import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button, Form, Card } from "react-bootstrap";

export default function AuthPage() {
  const { register, login, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await register(name, email, password);
        alert("Account created! Please log in.");
        setMode("login");
        setPassword("");
      } else {
        await login(email, password);
        navigate("/");
      }
    } catch (e) {
      if (e.code === 'auth/invalid-credential') {
        alert('Incorrect email or password.');
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 420 }}>
      <Card className="p-4 shadow-sm">
        <h3 className="text-center mb-3">
          {mode === "register" ? "Create account" : "Login"}
        </h3>
        <Form onSubmit={onSubmit}>
          {mode === "register" && (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={name}
                onChange={(e) => setName(e.target.value)} />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="success">
              {mode === "register" ? "Register" : "Login"}
            </Button>
            <Button type="button" variant="outline-secondary" onClick={() => setMode(mode === "register" ? "login" : "register")}>
              {mode === "register" ? "Have an account? Login" : "New user? Register"}
            </Button>
            <Button type="button" variant="outline-danger" onClick={loginWithGoogle}>
              Continue with Google
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
