import React from "react";
import { transformUrl } from "../../lib/features";

const RanderAttachment = (file, url) => {
  switch (file) {
    case "video":
      return (
        <div className="randerAttachment">
          <video src={url} preload="none" width={"100%"} controls />
          <p className="formatName">{file} File</p>
        </div>
      );

    case "image":
      return (
        <div className="randerAttachment">
          <img src={transformUrl(url)} width={"100%"} alt="Attachment" />
          <p className="formatName">{file} File</p>
        </div>
      );

    case "pdf":
      return (
        <div className="randerAttachment">
          {}
          <p className="formatName">{file} File</p>
        </div>
      );

    case "audio":
      return (
        <div className="randerAttachment">
          <audio src={url} preload="none" controls />
          <p className="formatName">{file} File</p>
        </div>
      );

    case "unknown":
      return (
        <div className="randerAttachment">
          {}
          <p className="formatName">{file} File</p>
        </div>
      );
  }
};

export default RanderAttachment;
