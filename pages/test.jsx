import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const titleAH = (props) => {
  return(<h1>AHHH</h1>)
}

const titleBH = (props) => {
  return(<h1>BHHH</h1>)
}

const titleCond = (props) => {
  if (false) {
    return <>{titleAH()}</>
  } else {
    return <>{titleBH()}</>
  }
}

export default function Test() {
  const { data, error } = useSWR(
    "https://api.github.com/repos/vercel/swr",
    fetcher
    );
    

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      {titleCond()}
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👁 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
