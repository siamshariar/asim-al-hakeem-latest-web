import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export default function Pagination() {
	return (
		<section className="cat-pagination">
			<a className="cat-page-link link-prev" href="#">
				<KeyboardArrowLeftIcon />
				<span>পূর্ববর্তী</span>
			</a>

			<div className="cat-page">পৃষ্ঠা <strong>১</strong> মধ্যে <strong>১</strong></div>

			<a className="cat-page-link link-next" href="#">
				<span>পরবর্তী</span>
				<KeyboardArrowRightIcon />
			</a>
		</section>
	)
}