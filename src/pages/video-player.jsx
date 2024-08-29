import { useParams } from "react-router-dom";
import Player from "../components/player/player";

export default function VideoPlayer({ videos })  { 
    const { id } = useParams();
    const video = videos[id];

    return (
        <>
        <div className="grid grid-flow-col grid-cols-1 sm:grid-cols-1 ">
            <Player videoUrl={video.url}/>

        </div>
        </>
    )
}
