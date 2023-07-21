"use client";
// import React from 'react';
import React, { useState, useEffect }  from 'react';


type LikesType ={
  productName:string | string[] | undefined;
}

export default function LikesSection(props:LikesType ) {

  const [addLikes, setaddLikes] = useState<{likes:number}>({ likes: 0 });

  const { productName } = { ...props }

  const likeProduct = async () => {
    try {
      const response = await fetch("/api/likeproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({ addLikes, productName }),
      });
      const result = await response.json();

      localStorage.setItem('likes', result.updatedProductInfo.likes);


    } catch (err) {
      console.error("Likes Not Working!!!!! : " + err);
    }
  };

  useEffect(() => {
    let updatedLikes
    // Get the value from local storage if it exists
    updatedLikes = localStorage.getItem("likes") || ""

    setaddLikes({ likes: +updatedLikes });
  }, [])




  return (
    <div id="upvotes-section">
      <button
        type="submit"
        onClick={() => {
          likeProduct();
        }}
        className="upvotes-section-btn"
      >
        Add Like
      </button>
      <p className="upvotes-section-text">
        This product has {

          addLikes.likes

        } likes so far !
      </p>
    </div>
  );
}
