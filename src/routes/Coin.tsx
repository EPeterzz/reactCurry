import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.2em;
  color: #333;
  font-weight: bold;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff;
`;

const RankContainer = styled.div`
  font-size: 1.2em;
  margin-top: 20px;
  color: #333;
`;

interface RouteParams {
  coinId: string;
}

interface LocationState {
  name: string;
  rank: number;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();  // URL에서 코인 ID 추출
  const { state } = useLocation<LocationState>();  // 클릭된 코인의 이름과 rank를 받아옴

  const [loading, setLoading] = useState(true);
  const [coinDetails, setCoinDetails] = useState<LocationState | null>(null);

  useEffect(() => {
    // 여기서 API 호출로 추가 정보를 가져올 수 있습니다
    setLoading(false);
    setCoinDetails(state);  // 예시로 state로 전달된 name과 rank를 설정
  }, [state]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>
        <Title>코인 상세 정보</Title>
      </Header>
      {coinDetails ? (
        <div>
          <div>이름: {coinDetails.name}</div>
          <RankContainer>Rank: {coinDetails.rank}</RankContainer>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </Container>
  );
}

export default Coin;