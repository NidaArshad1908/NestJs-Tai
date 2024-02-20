"use client";

import { NextPage } from "next";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { SyntheticEvent, useRef, useState } from "react";
import Link from "next/link";
import { Backend_URL } from "../lib/Constants";
import Layout from "../layout/Layout";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const Register: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:4001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    await router.push("/login");
  };

  const register = async () => {
    const res = await fetch("http://localhost:4001/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    console.log({ response });
  };

  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    debugger;
    const res = await fetch("http://localhost:4001/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res >>>>", res);
    if (res.ok) {
      alert("user registered success");
      router.push("/login");
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 rounded-0">
              <Card.Body className="p-4">
                <h1>Register</h1>
                <p className="text-black-50">Create your account</p>

                <form onSubmit={register}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      autoComplete="off"
                      name="name"
                      placeholder="Username"
                      required
                      // onChange={(e) => setName(e.target.value)}
                      onChange={(e) => (data.current.name = e.target.value)}
                      type="text"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                    </InputGroup.Text>

                    <Form.Control
                      name="email"
                      required
                      placeholder="Email"
                      // onChange={(e) => setEmail(e.target.value)}
                      onChange={(e) => (data.current.email = e.target.value)}
                      type="text"
                      autoComplete="off"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} fixedWidth />
                    </InputGroup.Text>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                      // onChange={(e) => setPassword(e.target.value)}
                      onChange={(e) => (data.current.password = e.target.value)}
                    />
                  </InputGroup>

                  <Button
                    type="submit"
                    className="d-block w-100"
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                  <Link className="" href={"/"}>
                    Cancel
                  </Link>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
