/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProgressiveImage from "react-progressive-image";

const Card = ({ id, Rarity, CardType, onClick }) => {
  const type = Rarity === "Common" || CardType === "HQ" ? "png" : "gif";
  return (
    <div
      className="modal-btn"
      onClick={() => onClick({ id, type })}
    >
      <ProgressiveImage
        src={`https://deviants-factions.mo.cloudinary.net/cards/${id}.${type}?tx=w_200,q_100,f_auto`}
      >
        {src =>
          <LazyLoadImage
            className="card"
            alt=""
            height={'auto'}
            width={200}
            src={src}
          />
        }
      </ProgressiveImage>
    </div>
  );
}

export default React.memo(Card);
