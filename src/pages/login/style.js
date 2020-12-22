import styled from "styled-components";

export const LQLoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #2b4b6b;
  .loginBox {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logoImg {
      position: relative;
      left: 50%;
      margin-left: -50px;
      margin-top: -50px;
      width: 100px;
      height: 100px;
    }
  }
  .btnBox {
    text-align: right;
    button {
      margin-right: 15px;
    }
  }
`;
