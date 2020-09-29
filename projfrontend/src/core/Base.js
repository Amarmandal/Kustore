import React from "react";
import "../styles.css";
import Menu from "./Menu";

const Base = ({
	title = "",
	description = "",
	className = "text-white p-4 jumbo",
	children
}) => (
		<div>
			<Menu />
			<div className="container-fluid main-base">
				<div className="jumbotron jumbo text-dark text-center">
					<b><h2 className="display-4 text_style">{title}</h2></b>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer py-3">
				<div className="container-fluid contact-bg text-dark text-center py-3 text_style">
					<h4>If you want to add your products, please reach us out!</h4>
					<a className="btn btn-primary btn-lg" href="mailto:email.kustore@gmail.com">Contact Us</a>
				</div>
				<div className="container">
					<div className="text-muted text-center">
						&copy; 2020 <span className="text-dark">KU Store</span> All right reserved
                    </div>
				</div>
			</footer>
		</div>
	);

export default Base;
