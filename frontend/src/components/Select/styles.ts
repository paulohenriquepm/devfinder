import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  > label {
    font-size: 12px;
    color: #11273a;
    margin-bottom: 8px;
  }

  > span {
    position: absolute;
    top: 45px;
    color: #e53935;
    font-size: 10px;
    font-weight: bold;
  }
`;
