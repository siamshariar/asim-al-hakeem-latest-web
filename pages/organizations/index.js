import { server } from "../../lib/config";
import {
  getOrganizations,
  getOrganizationDetails,
  getAllPlaylists2,
} from "../../lib/fetch";
import { useState } from "react";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import Header from "../../components/header";
import OrganizationCard from "../../components/card/post-card-organization";
import OrganizationCard2 from "../../components/card/post-card-organization2";
import OrganizationNav from "../../components/organization-nav";

export default function OrganizationList({ organizations, playlists }) {
  // const [init, setInit] = useState(false)
  // const [fetching, setFetching] = useState(false)
  // const [open, setOpen] = useState(false)
  // const [data, setData] = useState(null)
  // const [currentID, setCurrentID] = useState(null)

  // const handleOpen = id => {
  // 	setOpen(true)

  // 	if (!init || currentID !== id) {
  // 		setFetching(true)

  // 		getOrganizationDetails(id).then(res => {
  // 			setData(res)
  // 			setInit(true)
  // 			setCurrentID(id)
  // 			setFetching(false)
  // 		})
  // 	}
  // }

  // const handleClose = (open) => event => {
  // 	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  // 		return
  // 	}
  // 	setOpen(open)
  // }

  return (
    <>
      <Meta
        title="অর্গানাইজেশনস | ড. মুহাম্মাদ সাইফুল্লাহ অফিসিয়াল ওয়েবসাইট - Official website of Dr. Muhammad Saifullah"
        description="ড. মুহাম্মাদ সাইফুল্লাহ একজন অধ্যাপক, ইসলামিক
        স্কলার, লেখক, গবেষক এবং দ্বীনের একনিষ্ঠ দা'য়ী।
        ইসলামের প্রচার-প্রসারে স্বনামধন্য মিডিয়া ব্যক্তিত্বও।
        ফিকহ শারীআহ, ইসলামি আইন ও আইনশাস্ত্র বিভাগ, মদীনা ইসলামি বিশ্ববিদ্যালয়, কিংডম অফ সৌদি আরব থেকে ব্যাচেলর, মাস্টার্স ও পিএচডি সম্পন্ন করেন।"
        url={`${server}/organizations`}
        image={`${server}/img/id/default_share.png`}
        type="website"
      />

      <Header playlists={playlists} />

      <section className="cat-page-top">
        <div className="page-width">
          <div className="box">
            <h1>অর্গানাইজেশনস</h1>
            {/*<p>আমার বাংলা নিয়ে প্রথম কাজ করবার সুযোগ তৈরি হয়েছিল অভ্র নামক এক যুগান্তকারী বাংলা সফ্‌টওয়্যার হাতে পাবার মধ্য দিয়ে।</p>*/}
          </div>
        </div>
      </section>

      <section className="organization-list">
        <div className="page-width">
          <div className="box">
              <p style={{ marginBottom: "30px" }}>
                  আপডেট করা হবে ইন শা আল্লাহ।
              </p>
            {/*<div className="row row-r">*/}
            {/*  {organizations &&*/}
            {/*    organizations.length &&*/}
            {/*    organizations.map((organization) => (*/}
            {/*      <div className="col col-r s12 l6 xl4" key={organization.id}>*/}
            {/*        <OrganizationCard*/}
            {/*          organization={organization}*/}
            {/*          // navControl={handleOpen}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* 2nd design */}
            {/*<div className="row row-r">*/}
            {/*  {organizations &&*/}
            {/*    organizations.length &&*/}
            {/*    organizations.map((organization) => (*/}
            {/*      <div*/}
            {/*        className="col col-r col-no-padding col-no-margin s12 l6 xl4"*/}
            {/*        key={organization.id}*/}
            {/*      >*/}
            {/*        <OrganizationCard2*/}
            {/*          organization={organization}*/}
            {/*          // navControl={handleOpen}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
          </div>
        </div>
      </section>

      {/* <OrganizationNav
				init={init}
				fetching={fetching}
				open={open}
				data={data}
				navControl={handleClose}
			/> */}
    </>
  );
}

export async function getStaticProps(context) {
  //const res = await fetch(`${server}/api/organizations/listpage`)
  //const organizations = await res.json()

  const organizations = await getOrganizations();
  const playlists = await getAllPlaylists2();

  return {
    props: {
      organizations,
      playlists: playlists.playlists,
    },
  };
}
