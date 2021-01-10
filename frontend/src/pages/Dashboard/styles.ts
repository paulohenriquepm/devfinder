import styled from 'styled-components';
import { Form } from '@unform/web';
import { lighten } from 'polished';

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

  @media (max-width: 1320px) {
    max-width: 920px;
  }

  @media (max-width: 1024px) {
    max-width: 720px;
  }

  @media (max-width: 768px) {
    max-width: 520px;
  }

  @media (max-width: 425px) {
    justify-content: center;
  }
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

  img {
    width: 440px;
    height: 440px;
  }

  @media (max-width: 1320px) {
    max-width: 920px;

    img {
      width: 400px;
      height: 400px;
    }
  }

  @media (max-width: 1024px) {
    max-width: 720px;

    img {
      width: 360px;
      height: 360px;
    }
  }

  @media (max-width: 768px) {
    max-width: 520px;

    img {
      display: none;
    }
  }

  @media (max-width: 425px) {
    max-width: 320px;

    img {
      display: none;
    }
  }
`;

export const TopContentMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  color: #fff;
  margin-left: 32px;

  strong {
    font-size: 48px;
  }

  span {
    font-size: 32px;
  }

  @media (max-width: 1320px) {
    strong {
      font-size: 32px;
    }

    span {
      font-size: 24px;
    }
  }

  @media (max-width: 1024px) {
    strong {
      font-size: 24px;
    }

    span {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    margin-left: 0;

    strong {
      font-size: 48px;
    }

    span {
      margin-top: 24px;
      font-size: 24px;
    }
  }

  @media (max-width: 425px) {
    margin-left: 0;

    strong {
      font-size: 32px;
    }

    span {
      margin-top: 16px;
      font-size: 16px;
    }
  }
`;

export const Filter = styled(Form)`
  display: flex;
  align-items: center;

  position: absolute;
  left: 0;
  right: 0;
  bottom: -46px;
  border-radius: 10px;
  margin: auto;
  background: #fff;
  box-shadow: 0px 1px 2px #00000029;
  padding: 16px;
  max-width: 1320px;

  > div + div {
    margin-left: 16px;
  }

  .experience,
  .ufs,
  .cities,
  .technologies {
    width: 25%;
  }

  button {
    margin-left: 16px;
    height: 30px;
    width: 35px;
    border-radius: 50%;
    background: #6e2b77;
    transition: background 0.2s;

    &:hover {
      background: ${lighten(0.1, '#6e2b77')};
    }

    &.text {
      display: none;
    }
  }

  @media (max-width: 1320px) {
    max-width: 1120px;
  }

  @media (max-width: 1024px) {
    max-width: 920px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    position: initial;
    max-width: 720px;
    border-radius: unset;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    .experience,
    .ufs,
    .cities,
    .technologies {
      width: 100%;
    }

    > div + div {
      margin-left: 0px;
      margin-top: 8px;
    }

    button {
      width: 100%;
      border-radius: 4px;
      margin-left: 0;
      margin-top: 8px;
      color: #fff;

      &.icon {
        display: none;
      }

      &.text {
        display: block;
      }
    }
  }

  @media (max-width: 425px) {
    max-width: 320px;
  }
`;

export const Content = styled.main`
  display: flex;

  background: #f8f8f8;
  min-height: 480px;
  padding-bottom: 46px;
`;

export const DevsList = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 24px;

  max-width: 1320px;
  padding-top: 96px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 920px;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    width: 320px;
    grid-template-columns: 1fr;
  }
`;

export const Dev = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding: 16px;
  background: #fff;
  color: #11273a;
  width: 320px;
  height: 320px;
  border: 1px solid #00000029;

  &:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  &:nth-child(2) {
    grid-column-start: 3;
    grid-column-end: 5;
  }

  &:nth-child(3) {
    grid-column-start: 5;
    grid-column-end: 7;
  }

  &:nth-child(4) {
    grid-row-start: 2;
    grid-column-start: 2;
    grid-column-end: 4;
  }

  &:nth-child(5) {
    grid-row-start: 2;
    grid-column-start: 4;
    grid-column-end: 6;
  }

  img {
    align-self: center;
    margin-bottom: 16px;
    width: 100px;
    height: 100px;
  }

  span {
    & + span {
      margin-top: 8px;
    }
  }

  @media (max-width: 1024px) {
    grid-column: initial !important;
    grid-row-start: initial !important;
    width: 100%;
    height: 100%;
  }
`;
