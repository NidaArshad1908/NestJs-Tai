import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBasketShopping,
  faChartBar,
  faGaugeHigh,
  faList,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Badge, Dropdown, Nav, NavLink, ProgressBar } from "react-bootstrap";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import Image from "next/image";

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

export default function HeaderNotificationNav() {
  return (
    <Nav>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="hide-caret"
            id="dropdown-notification"
          >
            <FontAwesomeIcon icon={faBell} size="lg" />
            {/* <Badge pill bg="danger" className="position-absolute top-0 right-0">
              5
            </Badge> */}
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
            <Dropdown.Header className="bg-light fw-bold rounded-top">
              You have 5 notifications
            </Dropdown.Header>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faUserPlus}>
                  New user registered
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faUserMinus}>User deleted</ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faChartBar}>
                  Sales report is ready
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faBasketShopping}>New client</ItemWithIcon>
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <ItemWithIcon icon={faGaugeHigh}>
                  Server overloaded
                </ItemWithIcon>
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
      <Nav.Item>
        <Dropdown>
          <Dropdown.Toggle
            as={NavLink}
            bsPrefix="hide-caret"
            id="dropdown-task"
          >
            <FontAwesomeIcon icon={faList} size="lg" />
            {/* <Badge
              pill
              bg="warning"
              className="position-absolute top-0 right-0"
            >
              5
            </Badge> */}
          </Dropdown.Toggle>
          <Dropdown.Menu className="pt-0" align="end">
            <Dropdown.Header className="bg-light fw-bold rounded-top">
              You have few pending tasks
            </Dropdown.Header>

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Salaries</div>
                  <div className="ms-auto">0%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={0}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Data 1</div>
                  <div className="ms-auto">25%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="danger"
                  now={25}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Data 2</div>
                  <div className="ms-auto">50%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="warning"
                  now={50}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Data 3</div>
                  <div className="ms-auto">75%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="primary"
                  now={75}
                />
              </Dropdown.Item>
            </Link>
            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item>
                <small className="d-flex">
                  <div>Data 4</div>
                  <div className="ms-auto">100%</div>
                </small>
                <ProgressBar
                  className="progress-thin mt-2"
                  variant="success"
                  now={100}
                />
              </Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            <Link href="#" passHref legacyBehavior>
              <Dropdown.Item className="text-center fw-bold">
                View all tasks
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    </Nav>
  );
}
