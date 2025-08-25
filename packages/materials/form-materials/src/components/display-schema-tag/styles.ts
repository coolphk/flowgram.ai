import styled, { keyframes, css } from 'styled-components';
import { Tag } from '@douyinfe/semi-ui';

export const PopoverContent = styled.div`
  padding: 10px;
`;

const breathe = keyframes`
  0% {
    outline-width: 1px;
    outline-offset: 0px;
  }
  50% {
    outline-width: 3px;
    outline-offset: 2px;
  }
  100% {
    outline-width: 1px;
    outline-offset: 0px;
  }
`;

const colorBreathe = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

export const StyledTag = styled(Tag) <{ outlineColor?: string }>`
  padding: 4px;
  //animation: ${colorBreathe} 2s ease-in-out infinite;

  ${props => props.outlineColor && css`
    outline: 1px solid ${props.outlineColor};
    outline-offset: 0px;
    animation: ${breathe} 2s ease-in-out infinite;
  `}

  /*.tag-icon {
    width: 12px;
    height: 12px;
  }*/
`;

export const TitleSpan = styled.span`
  display: inline-block;
  margin-left: 4px;
  margin-top: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
