import styled from "styled-components";
export const StyledMenu = styled.div`
  text-align: center;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 10px 4px;
`;
export const Select = styled.select`
  width: 20%;
  border-color: #ccc;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 625px) {
    width: 100%;
  }
`;
export const Container = styled.div`
  padding: 0 15px;
`;
export const Table = styled.table`
  padding: 0 15px;
  border: 1px solid #dee2e6;
  font-size: 13px;
`;
export const Td = styled.td`
  border-right: 1px solid #dee2e6;
`;
export const Th = styled.th`
  border-right: 1px solid #dee2e6;
  color: #fff;
`;
export const Thead = styled.thead`
  background-color: rgba(0, 0, 0, 0.5);
`;
export const TableResponsive = styled.div`
  width: 100%;
  overflow-x: auto;
`;
export const Button = styled.button`
  color: ${(props) => (props.confirm ? "#7a6d6d" : "")};
  border: none;
  background-color: #8fff49;
  padding: 5px 18px;
  border-radius: 4px;
`;
