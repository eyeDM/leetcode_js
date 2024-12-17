// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]}
 */
const twoSum = function(nums, target) {
	const diffMap = new Map();
	let diff;

	for (let index = 0; index < nums.length; index++) {
		diff = target - nums[index];
		if (diffMap.has(diff)) {
			return [index, diffMap.get(diff)];
		}
		diffMap.set(nums[index], index);
	}

	return [];
};
