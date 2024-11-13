import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const CoinsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Coin = styled.li`
  margin-bottom: 10px;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h1`
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? "#C8E2FB" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#F2F5D0" : "#F9957F")};
  }
`;

const LoadingContainer = styled.div`
  font-size: 1.5em;
  color: #007bff;
  padding: 20px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  const [filterType, setFilterType] = useState<"coin" | "token">("coin");

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  const filteredData = data?.filter((coin) => coin.type === filterType) || [];

  return (
    <Container>
      <Header>
        <Title>Coins and Tokens</Title>
      </Header>
      <ToggleContainer>
        <ToggleButton active={filterType === "coin"} onClick={() => setFilterType("coin")}>
          Coins
        </ToggleButton>
        <ToggleButton active={filterType === "token"} onClick={() => setFilterType("token")}>
          Tokens
        </ToggleButton>
      </ToggleContainer>
      <CoinsList>
        {filteredData.length > 0 ? (
          filteredData.map((coin) => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/coin/${coin.id}`, state: { name: coin.name, rank: coin.rank } }}>
                <strong>{coin.name}</strong> ({coin.symbol})
              </Link>
            </Coin>
          ))
        ) : (
          <div>No data available</div>
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;