import { Badge, Dropdown, Nav, NavItem } from "react-bootstrap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCreditCard,
  faEnvelopeOpen,
  faFile,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { PropsWithChildren } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGear,
  faListCheck,
  faLock,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import user from "../../../public/user_profile_male.jpg";

type ItemWithIconProps = {
  icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
  const { icon, children } = props;

  return (
    <>
      <FontAwesomeIcon className="me-2" icon={icon} fixedWidth />
      {children}
    </>
  );
};

export default function HeaderProfileNav() {
  const router = useRouter();

  const logout = async () => {
    const res = await axios.post("/login");
    if (res.status === 200) {
      router.push("/login");
    }
  };

  return (
    <Nav>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle
          variant="link"
          bsPrefix="hide-caret"
          className="py-0 px-2 rounded-0"
          id="dropdown-profile"
        >
          <div className="avatar position-relative">
            <Image
              fill
              className="rounded-circle"
              src={user}
              alt="user@email.com"
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header className="bg-light fw-bold rounded-top">
            Account
          </Dropdown.Header>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faBell}>
                Updates
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faListCheck}>
                Tasks
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faMessage}>
                Messages
              </ItemWithIcon>
            </Dropdown.Item>
          </Link>

          <Dropdown.Header className="bg-light fw-bold">
            Settings
          </Dropdown.Header>

          <Link href="/profile" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faUser}>Profile</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faGear}>Settings</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Link href="#" passHref legacyBehavior>
            <Dropdown.Item>
              <ItemWithIcon icon={faCreditCard}>Payments</ItemWithIcon>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />

          <Dropdown.Item onClick={logout}>
            <ItemWithIcon icon={faPowerOff}>Logout</ItemWithIcon>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
}
