import backgroundImage from "../assets/background.jpg";
const videos = [
  {
    username: "user1",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user2",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user3",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user4",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user5",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user6",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user7",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user8",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user9",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user10",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user11",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user12",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
];

const Home = () => {
  return (
    <>
      <div className="bg-cover bg-center h-fit">
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-white lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <a href={`/video/${index}`}>
                <div
                  key={index}
                  tabIndex={0}
                  className="flex flex-col items-center hover:scale-105 p-2 hover:bg-gradient-to-r hover:bg-[#000]/50 transition ease-in-out  border rounded-[15px] "
                >
                  <video
                    src={video.url}
                    className="w-[500px] h-auto aspect-video object-cover cursor-pointer m-5 rounded-[15px] border-2 border-solid border-[#302b2b] "
                  />
                  <div className="flex justify-between items-center w-full px-5">
                    <div className="text-sm grid grid-cols-3">
                      <p>{video.name}</p>
                      <p>{video.username}</p>
                      <p>{video.date}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
