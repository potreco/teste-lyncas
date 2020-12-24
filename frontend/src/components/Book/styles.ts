import styled from 'styled-components';

export const Box = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  display: block;
  text-decoration: none;

  display: flex;
  transition: transform 0.2s;

  & + div {
    margin-top: 16px;
  }

  &:hover {
    transform: translateX(10px);
  }
`;

export const Image = styled.img`
  width: 150px;
  height: 180px;
`;

export const BookInfo = styled.div`
  margin-left: 16px;
  max-width: 80%;
`;

export const BookTitle = styled.strong`
  font-size: 20px;
  color: #3d3d4d;
`;

export const BookDescr = styled.p`
  font-size: 18px;
  color: #a8a8b3;
  margin-top: 4px;
`;
