import {
	ChevronRightIcon,
	ChevronLeftIcon,
	ChevronDoubleRightIcon,
	ChevronDoubleLeftIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';
import { PaginationType } from 'interfaces';
import React from 'react';

interface PaginationProps {
	totalRecords: number;
	pageLimit?: number;
	pageNeighbours?: number;
	onPageChanged: (data: PaginationType) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	totalRecords,
	pageLimit = 10,
	pageNeighbours = 1, //0 1 2
	onPageChanged,
}) => {
	const LEFT_PAGE = -1;
	const RIGHT_PAGE = -2;
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pages, setPages] = React.useState<number[]>([]);
	const totalPages = React.useMemo(() => {
		return Math.ceil(totalRecords / pageLimit);
	}, [totalRecords, pageLimit]);

	const range = (from: number, to: number, step = 1) => {
		let i = from;
		const range = [];
		while (i <= to) {
			range.push(i);
			i += step;
		}
		return range;
	};

	React.useEffect(() => {
		/**
		 * totalNumbers: the total page numbers to show on the control
		 * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
		 */
		const totalNumbers = pageNeighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - pageNeighbours);
			const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
			let pages = range(startPage, endPage);

			/**
			 * hasLeftSpill: has hidden pages to the left
			 * hasRightSpill: has hidden pages to the right
			 * spillOffset: number of hidden pages either to the left or to the right
			 */
			const hasLeftSpill = startPage > 2;
			const hasRightSpill = totalPages - endPage > 1;
			const spillOffset = totalNumbers - (pages.length + 1);

			switch (true) {
				// handle: (1) < {5 6} [7] {8 9} (10)
				case hasLeftSpill && !hasRightSpill: {
					const extraPages = range(startPage - spillOffset, startPage - 1);
					pages = [LEFT_PAGE, ...extraPages, ...pages];
					break;
				}

				// handle: (1) {2 3} [4] {5 6} > (10)
				case !hasLeftSpill && hasRightSpill: {
					const extraPages = range(endPage + 1, endPage + spillOffset);
					pages = [...pages, ...extraPages, RIGHT_PAGE];
					break;
				}

				// handle: (1) < {4 5} [6] {7 8} > (10)
				case hasLeftSpill && hasRightSpill:
				default: {
					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
					break;
				}
			}
			setPages([1, ...pages, totalPages]);
		} else {
			setPages(range(1, totalPages));
		}
	}, [totalPages, currentPage, pageNeighbours]);

	const gotoPage = (page: number) => {
		const currentPage = Math.max(0, Math.min(page, totalPages));
		const paginationData = {
			currentPage,
			totalPages,
			pageLimit,
			totalRecords,
		};

		onPageChanged(paginationData);
		setCurrentPage(currentPage);
	};

	const handleClick = (page: number) => (evt: any) => {
		evt.preventDefault();
		gotoPage(page);
	};

	const handleMoveLeft = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage - 1);
	};

	const handleMoveRight = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage + 1);
	};

	const handleMoveLeftDoble = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage - pageNeighbours * 2 - 1);
	};

	const handleMoveRightDoble = (evt: any) => {
		evt.preventDefault();
		gotoPage(currentPage + pageNeighbours * 2 + 1);
	};

	return (
		<nav
			className="my-2 relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
			aria-label="Pagination"
		>
			<a
				href="#"
				aria-label="Previous"
				onClick={handleMoveLeft}
				className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
			>
				<span className="sr-only">Previous</span>
				<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
			</a>
			{pages.map((page, index) => {
				if (page === LEFT_PAGE)
					return (
						<a
							key={`pagination-${index}`}
							href="#"
							aria-label="Previous"
							onClick={handleMoveLeftDoble}
							className={clsx(
								'z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
							)}
						>
							<span className="sr-only">Next</span>
							<ChevronDoubleLeftIcon className="h-3 w-3" aria-hidden="true" />
						</a>
					);

				if (page === RIGHT_PAGE)
					return (
						<a
							key={`pagination-${index}`}
							href="#"
							aria-label="Next"
							onClick={handleMoveRightDoble}
							className={clsx(
								'z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
							)}
						>
							<span className="sr-only">Next</span>
							<ChevronDoubleRightIcon className="h-3 w-3" aria-hidden="true" />
						</a>
					);
				return (
					<a
						key={`pagination-${index}`}
						href="#"
						aria-current="page"
						onClick={handleClick(page)}
						className={clsx(
							'z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
							{
								'bg-status-active border-status-active text-white':
									page === currentPage,
							},
							{
								'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
									page !== currentPage,
							}
						)}
					>
						{page}
					</a>
				);
			})}
			<a
				href="#"
				aria-label="Next"
				onClick={handleMoveRight}
				className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
			>
				<span className="sr-only">Next</span>
				<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
			</a>
		</nav>
	);
};

export default Pagination;
