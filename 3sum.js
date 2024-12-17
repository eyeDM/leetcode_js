// https://leetcode.com/problems/3sum/

/**
 * @param {number[]} nums
 * @returns {number[][]}
 */
const threeSum = function(nums) {
	const triplets = [];

	nums.sort((a, b) => a - b);

	for (let i = 0; i < nums.length - 2; i++) {
		// остались только положительные числа
		if (nums[i] > 0) break;

		// пропускаем дубликаты
		if (i > 0 && nums[i] === nums[i - 1]) continue;

		let left = i + 1;
		let right = nums.length - 1;

		while (left < right) {
			const sum = nums[i] + nums[left] + nums[right];

			if (sum === 0) {
				triplets.push([nums[i], nums[left], nums[right]]);
				left++;
				right--;

				// сдвигаем указатели, пропуская дубликаты
				while (left < right && nums[left] === nums[left - 1]) left++;
				while (left < right && nums[right] === nums[right + 1]) right--;
			} else if (sum < 0) {
				left++;
			} else {
				right--;
			}
		}
	}

	return triplets;
};

// --------

const dumpResult = (arr) => {
	if (arr.length === 0) {
		console.log('[empty array]');
	} else {
		arr.forEach(x => console.log(x.sort((a, b) => b - a)));
	}
};

const testCases = [
	{ input: [-1,0,1,2,-1,-4], expected: [[-1,-1,2],[-1,0,1]] },
	{ input: [0,1,1], expected: [] },
	{ input: [0,0,0], expected: [[0,0,0]] },
	{ input: [1,2,-2,-1], expected: [] },
	{ input: [1,1,-2], expected: [[-2,1,1]] },
	{ input: [3,0,-2,-1,1,2], expected: [[-2,-1,3],[-2,0,2],[-1,0,1]] },
	{ input: [34,55,79,28,46,33,2,48,31,-3,84,71,52,-3,93,15,21,-43,57,-6,86,56,94,74,83,-14,28,-66,46,-49,62,-11,43,65,77,12,47,61,26,1,13,29,55,-82,76,26,15,-29,36,-29,10,-70,69,17,49], expected: [[-82,-11,93],[-82,13,69],[-82,17,65],[-82,21,61],[-82,26,56],[-82,33,49],[-82,34,48],[-82,36,46],[-70,-14,84],[-70,-6,76],[-70,1,69],[-70,13,57],[-70,15,55],[-70,21,49],[-70,34,36],[-66,-11,77],[-66,-3,69],[-66,1,65],[-66,10,56],[-66,17,49],[-49,-6,55],[-49,-3,52],[-49,1,48],[-49,2,47],[-49,13,36],[-49,15,34],[-49,21,28],[-43,-14,57],[-43,-6,49],[-43,-3,46],[-43,10,33],[-43,12,31],[-43,15,28],[-43,17,26],[-29,-14,43],[-29,1,28],[-29,12,17],[-14,-3,17],[-14,1,13],[-14,2,12],[-11,-6,17],[-11,1,10],[-3,1,2]] },
];

testCases.forEach((testCase) => {
	const output = threeSum(testCase.input);

	if (output.length === testCase.expected.length) {
		console.info('passed?');
	} else {
		console.error('WRONG!');

		console.log('input:', testCase.input);

		console.log('output:');
		dumpResult(output);

		console.log('expected:');
		dumpResult(testCase.expected);
	}

	console.log('***');
});
