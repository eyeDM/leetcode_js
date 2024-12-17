// https://leetcode.com/problems/3sum/

// Возможные решения:
// 1. три ноля.
// 2. один ноль, два противоположных.
// 3. одно отрицательное, два положительных, в сумме равных модулю первого.
// 4. одно положительное, два отрицательных, модуль суммы которых равен первому.

/**
 * @param {number[]} nums
 * @returns {number[][]}
 */
const threeSum = function(nums) {
	const tree = new BTree();
	const result = [];
	let zerosCnt = 0;

	nums.forEach((num) => {
		if (num === 0) {
			zerosCnt++;
			return;
		}

		tree.add(num);
	});

	tree.traverse(tree.root, (node) => {
		const diffMap = {};
		let diff;

		// среди чисел, которые меньше текущего, ищем пары,
		// в сумме дающие противоположное текущему
		tree.traverse(tree.root, (childNode) => { // FIXME: N^2
			if (childNode.num >= node.num) {
				return;
			}

			if (
				childNode.hasOwnProperty('hasPair')
				&& node.num === childNode.num * (-2)
			) {
				result.push([node.num, childNode.num, childNode.num]);
				return;
			}

			diff = - node.num - childNode.num;
			if (diffMap.hasOwnProperty(diff)) {
				result.push([node.num, childNode.num, diff]);
				return;
			}
			diffMap[ childNode.num ] = diff;
		});

		// #2
		if (zerosCnt && node.hasOwnProperty('hasOppositePair')) {
			result.push([0, node.num, - node.num]);
		}
	});

	// #1
	if (zerosCnt > 2) {
		result.push([0, 0, 0]);
	}

	return result;
};

const BTree = function() {
	this.root = null;
	this.db = {};
};

BTree.prototype.add = function(num) {
	const key = String(num);
	const oppositeKey = num > 0 ? `-${key}` : String(0 - num);

	const insertToTree = (node, parent) => {
		if (node.num < parent.num) {
			if (parent.left === null) {
				parent.left = node;
			} else {
				insertToTree(node, parent.left);
			}
		} else {
			if (parent.right === null) {
				parent.right = node;
			} else {
				insertToTree(node, parent.right);
			}
		}
	};

	if (this.db.hasOwnProperty(key)) {
		this.db[key].hasPair = true;
	} else {
		this.db[key] = {
			num: num,
			left: null,
			right: null,
		};

		if (this.db.hasOwnProperty(oppositeKey)) {
			if (num > 0) {
				this.db[key].hasOppositePair = true;
			} else {
				this.db[oppositeKey].hasOppositePair = true;
			}
		}

		if (this.root === null) {
			this.root = this.db[key];
		} else {
			insertToTree(this.db[key], this.root);
		}
	}
};

BTree.prototype.traverse = function(node, callback) {
	if (node === null) {
		return;
	}

	callback(node);
	this.traverse(node.left, callback);
	this.traverse(node.right, callback);
};
