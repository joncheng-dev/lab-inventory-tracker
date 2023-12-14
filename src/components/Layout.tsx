import React, { ReactElement } from "react";
import styled from "styled-components";
import Header from "./Header";

const StyledLayout = styled.div`
  min-width: 100vw;
  min-height: 100vw;
`;

interface LayoutProps {
  children?: ReactElement;
}

function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  );
}

export default Layout;
