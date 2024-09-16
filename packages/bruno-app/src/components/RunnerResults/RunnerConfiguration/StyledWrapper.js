import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    thead,
    td {
      border: 1px solid ${(props) => props.theme.table.border};

      li {
        background-color: ${(props) => props.theme.bg} !important;
      }
    }
  }
`;

export default Wrapper;
