import { List as AntList } from 'antd';
import styled from 'styled-components';

const List = styled(AntList)`
  ul {
    display: ${props => props.layout === 'horizontal' && 'flex'};
    li {
        padding: 1px 8px 8px 0;
        &:first-child {
            padding-left: 8px;
        }
    }
  }
`;
export default List;
