// https://leetcode.com/problems/coin-change/

// TODO

/**
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
const coinChange = function(coins, amount) {
	if (amount <= 0) {
		return 0;
	}

	const MyOutput = new Output(coins);

	let remainder = MyOutput.addBiggest(amount);

	if (remainder === 0) {
		return MyOutput.getCoinsNum();
	}

	if (remainder === amount) {
		return -1;
	}

	let coinToReplace = MyOutput.getMinUsedGtThan( MyOutput.getMinPossible() );
	let coinToReplaceNum = 1;
	let remainderDiff = 0;
	let step = 0; // DEBUG

		debug(); // DEBUG

	// заменяем N крупных монет на более мелкие,
	// начиная с минимальной, но не самой маленькой
	while (remainder > 0 && coinToReplace !== null) {
		if (step++ > 50) break; // DEBUG

		remainderDiff = MyOutput.minus(coinToReplace, coinToReplaceNum);
		if (remainderDiff <= 0) { // таких монет уже нет
			coinToReplace = MyOutput.getMinUsedGtThan(coinToReplace);
			continue;
		}
		remainder += remainderDiff;

		remainder = MyOutput.addBiggestLtThan(remainder, coinToReplace);

		// если пробовали менять самую большую монету,
		// то возвращаемся к более мелким и увеличиваем количество;
		// иначе - пробуем более крупную
		if (coinToReplace >= MyOutput.getMaxUsed()) {
			coinToReplaceNum++;
			coinToReplace = MyOutput.getMinUsedGtThan( MyOutput.getMinPossible() );
		} else {
			coinToReplace = MyOutput.getMinUsedGtThan(coinToReplace);
		}

		debug(); // DEBUG
	}

	if (remainder > 0) {
		return -1;
	}

	function debug() {
		console.log({
			remainder: remainder,
			coinToReplace: coinToReplace,
			coinToReplaceNum: coinToReplaceNum
		});
		MyOutput.dump();
	}

	return MyOutput.getCoinsNum();
};

//////////

const Output = function(possibleCoins) {
	this.coins = [];
	this.wallet = {};

	possibleCoins.sort((a, b) => b - a).forEach((coin) => {
		this.coins.push(coin);
		this.wallet[coin] = 0;
	});
};

Output.prototype.dump = function() {
	console.log('*** dump ***');
	console.log('coins:');
	console.log(this.coins);
	console.log('wallet:');
	console.log(this.wallet);
	console.log('*** /dump ***');
};

/**
 * Добавить максимум монет наибольшего достоинства.
 *
 * @param {number} amount Требуемая сумма
 * @returns {number} Разница между `amount` и фактическим результатом
 */
Output.prototype.addBiggest = function(amount) {
	let remainder = amount;

	this.coins.forEach((coin) => {
		if (coin <= remainder) {
			this.wallet[coin] += Math.trunc(remainder / coin);
			remainder = remainder % coin;
		}
	});

	return remainder;
};

/**
 * Добавить максимум монет наибольшего достоинства из тех,
 * что меньше заданного значения.
 */
Output.prototype.addBiggestLtThan = function(amount, ltThan) {
	let remainder = amount;

	this.coins.forEach((coin) => {
		if (coin < ltThan && coin <= remainder) {
			this.wallet[coin] += Math.trunc(remainder / coin);
			remainder = remainder % coin;
		}
	});

	return remainder;
};

/**
 * Вычесть заданное количество указанной монеты.
 *
 * @param {number} coin
 * @param {number} num
 * @returns {number} Фактически вычтенная сумма
 */
Output.prototype.minus = function(coin, num) {
	let actualNum = this.wallet[coin] < num
		? this.wallet[coin]
		: num;

	this.wallet[coin] -= actualNum;
	return coin * actualNum;
};

// наименьшая из возможных
Output.prototype.getMinPossible = function() {
	return this.coins[ this.coins.length - 1 ];
};

// наименьшая из задействованных
Output.prototype.getMinUsed = function() {
	for (let i = this.coins.length - 1; i >= 0; i--) {
		if (this.wallet[ this.coins[i] ] > 0) {
			return this.coins[i];
		}
	}

	return null;
};

// наименьшая из задействованных, больше заданной
Output.prototype.getMinUsedGtThan = function(gtThan) {
	for (let i = this.coins.length - 1; i >= 0; i--) {
		if (
			this.coins[i] > gtThan
			&& this.wallet[ this.coins[i] ] > 0
		) {
			return this.coins[i];
		}
	}

	return null;
};

// наибольшая из задействованных
Output.prototype.getMaxUsed = function() {
	for (let i = 0; i < this.coins.length; i++) {
		if (this.wallet[ this.coins[i] ] > 0) {
			return this.coins[i];
		}
	}

	return null;
};

// текущее количество монет
Output.prototype.getCoinsNum = function() {
	let result = 0;
	this.coins.forEach((coin) => {
		result += this.wallet[coin];
	});

	return result;
};

// --------

// [5,7,11,13], 64
// [419,408,186,83], 6249

console.log(
	coinChange([5,7,11,13], 64)
);
