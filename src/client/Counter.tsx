import { useEffect, useState } from "hono/jsx";
import { hc } from "hono/client";
import { AppType } from "..";
import "./global.css";

export function Counter({ url }: { url?: any }) {
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)} type="button">
        Increase count
      </button>
      <span class={"text-blue-400"}>Count: {count}</span>
      <button
        onClick={async () => {
          const client = hc<AppType>(window.location.href);
          const res = await client.mk.$get();
          if (res.ok) {
            const data = await res.json();
            console.log(data);
          }
        }}
      >
        hello
      </button>

      <h1 class="text-5xl font-bold underline text-red-500">Hello world!</h1>
    </div>
  );
}
