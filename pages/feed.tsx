import { CardPost } from 'components/card-post';
import { Layout } from 'components/layout';
import { Recommended } from 'components/recomended';
import * as React from 'react';

const Feed = () => {
	return (
		<Layout withHeader withFooter>
			<div>
				<Recommended />
				<ul className="w-full grid gap-9 my-6">
					<CardPost />
					<CardPost />
					<CardPost />
					<CardPost />
					<CardPost />
					<CardPost />
					<CardPost />
				</ul>
			</div>
		</Layout>
	);
};

export default Feed;
