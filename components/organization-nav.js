import { server } from '../lib/config'
import Image from 'next/image'
import Drawer from '@material-ui/core/Drawer'
import Loader from './loader'
import Language from '@mui/icons-material/Language'

export default function OrganizationNav({ init, fetching, open, data, navControl }) {
	return (
		<Drawer
			anchor="right"
			open={open}
			onClose={navControl(false)}
		>
			<div className="organization-nav">
				{(!init || fetching) && <div className="organization-nav-spinner"><Loader /></div>}

				{init && (
					<div className="organization-nav-inner">
						<span
							className="close org-close"
							onClick={navControl(false)}
						></span>

						<div className="org-nav-top">
							<div className="org-nav-header">
								<a className="org-logo" href={data.orgWebsite} target="_blank">
									<Image
										src={server + data.imageSrc}
										alt=""
										layout="fill"
										objectFit="contain"
										objectPosition="center center"
										loading="eager" unoptimized
									/>
								</a>
								<h2 className="org-title">{data.orgName}</h2>
							</div>
						</div>

						<div className="org-detail">
							<div className="org-detail-wrap">
								<p>{data.orgDetail}</p>
							</div>
						</div>

						<div className="org-nav-bottom">
							<div className="org-nav-link">
								<a className="org-web" href={data.orgWebsite} target="_blank">
									<Language />
									<span>{data.orgWebsite}</span>
								</a>

								<div className="org-social">
									<a href={data.orgFacebook} target="_blank"><i className="facebook fab fa-facebook-f"></i></a>
									<a href={data.orgYoutube} target="_blank"><i className="youtube fab fa-youtube"></i></a>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Drawer>
	)
}