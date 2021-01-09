import styled, { css } from 'styled-components';

interface IProps {
  error: boolean;
}

export const Container = styled.div<IProps>`
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
    top: 62px;
    color: #e53935;
    font-size: 10px;
    font-weight: bold;
  }

  ${props =>
    props.error &&
    css`
      div.react-select__control {
        border: 1px solid #e53935;
      }
    `}

  .react-select__value-container {
    flex-wrap: unset;
    overflow-x: auto;

    .react-select__multi-value {
      margin: 0;
      min-width: unset;

      & + div {
        margin-left: 3px;
      }

      .react-select__multi-value__label {
        padding: 3px;
        text-overflow: unset;
        font-size: 12px;
      }
    }
  }
`;
