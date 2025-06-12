import footerCss from './Global/Footer.module.css';

function Footer() {
	return (
		<div className={footerCss.footerBox}>
			<h3 className={footerCss.text}>
				Copyright 2024. Sseuda All rights reserved.{' '}
			</h3>
		</div>
	);
}

export default Footer;