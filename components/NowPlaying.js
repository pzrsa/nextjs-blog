import Image from "next/image";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const NowPlaying = () => {
  const { data, error } = useSWR("/api/now-playing", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {data?.isPlaying ? (
        <div>
          <Image
            priority
            src={data.albumImageUrl}
            height={250}
            width={250}
            alt={data.album}
            title={data.album}
          />

          <p>
            listening to{" "}
            <a href={data.songUrl} target="_blank">
              {data.title} by {data.artist}
            </a>
          </p>
        </div>
      ) : (
        <p>not playing on Spotify right now</p>
      )}
    </>
  );
};

export default NowPlaying;
