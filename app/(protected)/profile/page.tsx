import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import AccessDenied from "../../components/access-denied";
import Image from "next/image";
//import { cookies } from 'next/headers'

export default async function Profile() {

  const session = await getServerSession( authOptions);
  // const cookieStore = cookies()
  // const theme = cookieStore.get('next-auth.session-token')

    return session?.user ? (
      <>
        <main id="main-content" className="clearfix">
          <h1 id="main-content-title">Profile</h1>
          <br />
          <figure id="profile-image">
            {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
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
              <p>Username : {session?.user?.name}</p>
                <br />
                <p>Email :{session?.user?.email}</p>
                <br/>
                <br/>
              <h1>API Example</h1>
              <p>
                The examples below show responses from the example API endpoints.
              </p>
              <p>
                <em>You must be signed in to see responses.</em>
              </p>
              <br/>
              <h2>Session</h2>
              <p>/api/examples/session</p>
              {/* <iframe src="/api/examples/session" /> */}
              <br/>
              <h2>JSON Web Token</h2>
              <p>/api/examples/jwt</p>
              <iframe src="/api/jwt-test/"/>
              <br/>
              <h2>Cookies</h2>
                 {/* <p>{theme?.value}</p> */}
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
