import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { UserType } from 'interfaces';
import { LayoutDashboard } from 'components/layout';

const Dashboard = () => {
	const mirar = (x: number, y: number) => {
		let aux = x;
		const serieX = [x];
		// const serieY = [3];]
		for (let i = 2; i <= y; i++) {
			aux = i * aux;
			serieX.push(aux);
		}
		// aux = 3;
		// for (let i = 2; i <= x; i++) {
		// 	aux = i * aux;
		// 	serieY.push(aux);
		// }
		console.log(serieX);
	};

	const maxSubarrayProduct = (nums: any, n: number) => {
		if (nums.length == 0) return 0;
		let max = nums[0];
		for (let i = 1; i < nums.length; i++) {
			if (nums[i - 1] > 0) {
				nums[i] += nums[i - 1];
			}
			max = Math.max(nums[i], max);
		}
		return max;
	};

	function maxSubArraySum(A: any, n: number) {
		let max_sum = 0;
		for (var i = 0; i < n - 1; i++) {
			let sum = 0;
			for (var j = i; j < n - 1; j++) {
				sum = sum + A[j];
				if (sum > max_sum) max_sum = sum;
			}
		}
		return max_sum;

		// let max_sum = 0;
		// for (var i = 0; i < n; i++) {
		// 	for (var j = i; j < n; j++) {
		// 		let sum = 0;
		// 		for (var k = i; k < n; k++) {
		// 			sum = sum + a[k];
		// 			if (sum > max_sum) max_sum = sum;
		// 		}
		// 	}
		// }
		// return max_sum;
	}

	const fibo = (number: number) => {
		let a = 0;
		let b = 1;
		let c;
		let s = 1;
		console.log(a, b);
		for (let i = 0; i < number; i++) {
			c = a + b;
			console.log(c);
			s = s + c;
			a = b;
			b = c;
		}
	};
	const grado = (hora: string) => {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		// Scanner scan = new Scanner(System.in);
		// String str = scan.nextLine();
		const s = hora.split(':');
		let h;
		let m;
		h = Number(s[0]);
		m = Number(s[1]);
		const gap = (30 * h - 5.5 * m) % 360;
		console.log(gap);
		return gap;
	};

	React.useEffect(() => {
		let arr = [1.1, -5.7, 4.0, 9.3, -5.7, 9.9, -1.4, 9.1, 2.0, -5.0, -9.0, 1.0];
		let n = arr.length;
		const result = maxSubarrayProduct(arr, n);
		console.log(result);
		fibo(39);
		const re =
			grado('12:07') + grado('17:33') - 100 + grado('23:01') + grado('16:50');
		console.log(re);
	}, []);

	// 1(2) 2(2) 4(3) 12(4) 48

	return (
		<LayoutDashboard title="Dashboard">
			<div className="py-4">
				<div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
			</div>
		</LayoutDashboard>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const user = (session?.user as unknown) as UserType;
	if (session && session.user && user.role !== 'admin') {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
};

export default Dashboard;
