export function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins")
        .then((response) => response.json())
        .then((data) => data.slice(0, 100));
}