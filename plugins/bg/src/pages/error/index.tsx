/** @format */

const ErrorPage = () => {
	return (
		<div>
			<p>
				Space Invadors destroyed this page! Take revenge on them!
				<br /> Use <span>Space</span> to shoot and <span>←</span>&#160;
				<span>→</span> to move!&#160;&#160;&#160;
				<button id='restart'>Restart</button>
			</p>

			<canvas id='space-invaders' />
		</div>
	);
};

export default ErrorPage;
