import styled from 'styled-components'
export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWidth || '1200px'};
`
//부정연산 A가 있으면 A, 없으면 B. A||B 변수에는 꼭 $를 붙일것 ($를 안붙여도 사용은 되나, warning이 뜸. 버전따라 달라진 부분인듯)
export const Main = styled.main`
   width: ${(props) => props.$width || '1200px'};
   margin: 0 auto;
   overflow: hidden;
   padding: ${(props) => props.$padding || 0};
`
