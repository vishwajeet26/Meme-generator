import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useClipboard } from "use-clipboard-copy";

const GeneratedMeme: FC = () => {
  const [copied, setCopied] = useState(false);
  const clipboard = useClipboard();
  const navigate = useNavigate();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <div>
      <button onClick={() => navigate("/")} className="bg-orange-500 mt-[50px]">
        Make More Memes
      </button>{" "}
      {url && <img src={url} alt="generated meme" />}
      <button className="bg-blue-500 mt-20" onClick={copyLink}>
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
};

export default GeneratedMeme;
