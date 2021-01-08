import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.div`
  height: 100%;
`;

export const Header = styled.header`
  padding: 16px 0;
  background: #41a9b9;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  max-width: 1120px;
  margin: 0 auto;
`;

export const TopContainer = styled.div`
  background: #41a9b9;
  position: relative;
`;

export const TopContent = styled.div`
  display: flex;

  padding: 16px 0 64px 0;
  max-width: 1120px;
  margin: 0 auto;
`;

export const TopContentMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  color: #fff;

  p {
    font-size: 48px;
  }

  span {
    font-size: 24px;
  }
`;

export const Filter = styled(Form)`
  display: flex;

  position: absolute;
  left: 0;
  right: 0;
  bottom: -35px;
  border-radius: 10px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 1px 2px #00000029;
  padding: 16px;
  max-width: 1320px;

  > div + div {
    margin-left: 16px;
  }

  .experience {
    width: 33%;
  }

  button {
    margin-left: 16px;
  }
`;

export const Content = styled.main`
  display: flex;

  height: 100%;
  background: #f8f8f8;
`;

export const DevsList = styled.div`
  display: flex;

  max-width: 1320px;
  padding-top: 96px;
  margin: 0 auto;
`;

export const Dev = styled.div`
  display: flex;
  flex-direction: column;

  padding: 16px;
  background: #fff;
  width: 240px;
  height: 240px;

  img {
    width: 100px;
    height: 100px;
  }
`;
