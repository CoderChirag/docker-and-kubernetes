import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Alert, CircularProgress, Grow, Snackbar } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, isAxiosError } from "axios";

const inter = Inter({ subsets: ["latin"] });

interface SQLData {
  success: boolean;
  data: { _id: number; value: number }[];
}

interface RedisData {
  success: boolean;
  data: {
    [key: string]: string;
  };
}

export default function Home() {
  const fetchSqlData = async () => {
    const res = await axios.get<SQLData>("/values/all");
    return res.data;
  };

  const fetchRedisData = async () => {
    const res = await axios.get<RedisData>("/values/cached");
    return res.data;
  };

  const postData = async (index: number) => {
    await axios.post("/values", {
      index: index,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const idx = parseInt(index);
    console.log(idx);
    if (!isNaN(idx)) {
      console.log(true);
      postMutation.mutate(idx);
    }
    setIndex("");
  };

  const queryClient = useQueryClient();
  const [index, setIndex] = useState("");
  const [error, setError] = useState<boolean | string>(false);
  const {
    status: sqlStatus,
    data: sqlData,
    error: sqlError,
  } = useQuery<SQLData, Error>("sql", fetchSqlData);
  const {
    status: redisStatus,
    data: redisData,
    error: redisError,
  } = useQuery<RedisData, Error>("redis", fetchRedisData);
  const postMutation = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries("sql");
      queryClient.invalidateQueries("redis");
    },
    onError: (err: AxiosError | Error) => {
      if (isAxiosError(err)) {
        setError(err.response?.data.error || err.message);
      } else {
        setError(err.message);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        TransitionComponent={(props) => <Grow {...props} />}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Enter your index:&nbsp;&nbsp;&nbsp;&nbsp;
            <code className={styles.code}>
              <input
                type="number"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              />
            </code>
          </p>
          <div>
            <button
              className={styles.btn}
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>
              Indexes I have seen (MySQL) <span>-&gt;</span>
            </h2>
            <p>
              {sqlStatus === "loading" && <CircularProgress />}
              {sqlStatus === "error" && <span>Error: {sqlError.message}</span>}
              {sqlStatus === "success" &&
                sqlData.data.map((d) => d.value).join(",  ")}
            </p>
          </a>

          <a className={styles.card}>
            <h2>
              Calculated Values (Redis) <span>-&gt;</span>
            </h2>
            <p>
              {redisStatus === "loading" && <CircularProgress />}
              {redisStatus === "error" && (
                <span>Error: {redisError.message}</span>
              )}
              {redisStatus === "success" &&
                Object.keys(redisData.data)
                  .map((d) => `${d}: ${redisData.data[d]}`)
                  .join(`,  `)}
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
