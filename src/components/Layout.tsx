import styled from "styled-components";
import Header from "./Header";
import { LayoutProps } from "../types";

const StyledLayout = styled.div`
  max-width: 100vw;
  min-height: 100vw;
`;

function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  );
}

export default Layout;
