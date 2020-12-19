import styled from "styled-components";

export const LQLayOutWrapper = styled.div`
  .header {
    position: relative;
    padding: 0;
    color: #fff;
    font-size: 20px;
    height: 60px;
    background-color: #373d41;
    .avatar {
      margin-right: 15px;
      width: 61px;
      height: 56px;
      border-radius: 50%;
    }
    .logout {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
  .slide {
    padding-top: 30px;
    background-color: #333744;
    .ant-menu-submenu {
      padding: 8px 0;
    }
  }
`;
