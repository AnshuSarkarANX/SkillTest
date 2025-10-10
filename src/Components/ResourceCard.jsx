import formattedDateTime from "../hooks/FormattedDateTime";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import YouTubePlayer from "./YoutubePlayer";

const ResourceCard = ({data}) => {
  return (
    <div className="bg-white p-[20px] rounded-[20px] smallShadow">
      {data?.type === "document" ? (
        <div className="space-y-[20px]">
          <div className="flex gap-[10px] items-center mb-[15px]">
            <img
              src={data?.userImage}
              alt={data?.postedby}
              className="w-[40px] h-[40px] rounded-full"
            />
            <div>
              <p>
                {data?.postedby} <br />
                <span className="text-[#808080] text-[14px]">
                  {data?.specialization ? ` ${data?.specialization}` : ""}
                </span>
              </p>
            </div>
          </div>
          <div>
            <img
              src={data?.images[0]}
              alt={data?.postedby}
              className="w-full h-[200px] object-contain rounded-[10px]"
            />
          </div>
          <div className="flex gap-[10px] items-center justify-between text-[20px]">
            <div className="flex gap-[5px] items-center">
              <div>{data?.liked ? <GoHeartFill /> : <FiHeart />}</div>
              <CiLocationArrow1 />
            </div>
            <div>
              <p className="text-text2 H-10">
                {formattedDateTime(data?.postTime)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-[20px]">
          <YouTubePlayer videoUrl={data?.link} />
          <div className="flex gap-[10px] items-center justify-between text-[20px]">
            <div className="flex gap-[5px] items-center">
              <div>{data?.liked ? <GoHeartFill /> : <FiHeart />}</div>
              <CiLocationArrow1 />
            </div>
            <div>
              <p className="text-text2 H-10">
                {formattedDateTime(data?.postTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceCard