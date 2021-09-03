import React from "react";
import { RightArrow, LeftArrow} from '../utils/ArrowSvg';


const Pagination = ({ increment, decrement, page }) => {

	return(
	
		<div className="pagination">
		<button className="pagination-btn" onClick={decrement}>
			<div className="icon">
				<LeftArrow />
			</div>
		</button>
		<div className="number">
			{page}
		</div>
		<button className="pagination-btn" onClick={increment}>
			<div className="icon">
				<RightArrow />
			</div>
		</button>
	</div>
	);
}

export default Pagination;