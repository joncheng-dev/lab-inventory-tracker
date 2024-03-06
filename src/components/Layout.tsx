import React from "react";
import styled from "styled-components";
import { LayoutProps } from "../types";

const StyledLayout = styled.div`
  max-width: 100vw;
  min-height: 100vw;
`;

function Layout({ children }: LayoutProps) {
  return <StyledLayout>{children}</StyledLayout>;
}

export default Layout;
