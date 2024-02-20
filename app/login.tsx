"use client";

import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import style from "../app/styles/layout/login.module.css";
import { Backend_URL } from "./lib/Constants";
import Layout from "./layout/Layout";
import { useRouter } from "next/navigation";
import nim from "./pages/register/index";

const Login: NextPage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit() {
    const res = await fetch("http://localhost:4001/api/login", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("token", json.token);
      router.push("/home");
    } else {
      alert("Bad credentials");
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col lg={8}>
            <Row>
              <Col md={7} className="bg-white border p-5">
                <div className="">
                  <h1>Login</h1>
                  <p className="text-black-50">Sign In to your account</p>

                  <form>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        name="username"
                        required
                        placeholder="Email"
                        aria-label="Username"
                        type="email"
                        onChange={(e) => {
                          setState({ ...state, username: e.target.value });
                        }}
                        className={style.input_text}
                        id="email"
                        autoComplete="email"
                      />
                      <span
                        className="icon flex items-center px-4"
                        style={{ marginTop: 10 }}
                      >
                        <HiAtSymbol size={25} />
                      </span>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} fixedWidth />
                      </InputGroup.Text>
                      <Form.Control
                        name="password"
                        required
                        placeholder="Password"
                        aria-label="Password"
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={(e) => {
                          setState({ ...state, password: e.target.value });
                        }}
                        type={`${show ? "text" : "password"}`}
                        className={style.input_text}
                      />
                      <span
                        className="icon flex items-center px-4"
                        style={{ marginTop: 10 }}
                        onClick={() => setShow(!show)}
                      >
                        <HiFingerPrint size={25} />
                      </span>
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button
                          onClick={handleSubmit}
                          className="flex gap-4 ml-auto text-green-600"
                        >
                          Login In
                        </Button>
                      </Col>
                      <Col xs={6} className="text-end">
                        <Button
                          className="px-0"
                          variant="link"
                          type="submit"
                          style={{ textDecoration: "none" }}
                        >
                          Forgot Password
                        </Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col
                md={5}
                className="bg-primary text-white d-flex align-items-center justify-content-center p-5"
              >
                <div className="text-center">
                  <h2>Sign up</h2>
                  <p>If you have no account then register or sign up first.</p>
                  <Button
                    href={"/register"}
                    className="btn btn-lg btn-outline-light mt-3"
                  >
                    Register Now!
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
