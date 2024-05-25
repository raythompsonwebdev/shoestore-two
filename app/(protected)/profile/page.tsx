import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import AccessDenied from "../../../components/access-denied";
import Image from "next/image";
import { cookies } from "next/headers";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  //cookies
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");
  console.log(sessionToken, session);

  return session !== null ? (
    <>
      <main id="main-content" className="clearfix">
        <h1 id="main-content-title">Profile</h1>
        <br />
        <figure id="profile-image">
          {session.user.image ? (
            <Image
              src={session.user.image}
              className="user-image"
              alt="Profile"
              width={174}
              height={150}
            />
          ) : (
            <Image
              src={"/images/placeholder.jpg"}
              className="user-image"
              alt="Profile"
              width={174}
              height={150}
            />
          )}
          {/* <Image src={image} alt="Profile" width={200} height={200} /> */}
          <figcaption id="profile-image-text">
            <p>Username : {session.user.name}</p>
            <br />
            <p>Email :{session.user.email}</p>
          </figcaption>
        </figure>
      </main>
    </>
  ) : (
    <>
      <AccessDenied />
    </>
  );
}
