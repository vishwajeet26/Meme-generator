import { useEffect, useState } from "react";
import { MemesModel } from "./models";
import { useNavigate } from "react-router-dom";

const Meme = () => {
  const getRandomNumber = () => Math.floor(Math.random() * 101);
  const navigate = useNavigate();

  const [memes, setMemes] = useState<MemesModel[]>([]);
  const [memeIndex, setMemeIndex] = useState<number>(getRandomNumber());
  const [captions, setCaptions] = useState<string[]>([]);

  const updateCaption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const text = e.target.value;
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };
  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append("username", "vishwajeetmemes");
    formData.append("password", "TiSHSE5GDw2J24W");
    formData.append("template_id", currentMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        navigate(`/generated?url=${res.data.url}`);
      });
    });
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) =>
      res.json().then((res) => {
        setMemes(res.data.memes);
      })
    );
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex]?.box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div>
      <button onClick={generateMeme} className="mt-[50px] bg-blue-500 ">
        Generate
      </button>
      <button
        onClick={() => setMemeIndex(getRandomNumber())}
        className="mt-[20px] bg-[#f0ad4e] "
      >
        Skip
      </button>
      {captions.map((_, index) => (
        <input
          key={index}
          onChange={(e) => updateCaption(e, index)}
          className="p-4 border border-black rounded-md"
        />
      ))}
      <img src={memes[memeIndex]?.url} alt="meme" />{" "}
    </div>
  ) : (
    <></>
  );
};

export default Meme;
