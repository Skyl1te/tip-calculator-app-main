const bill = document.querySelector('#bill')
const customTip = document.querySelector('#customTip')
const peopleAmount = document.querySelector('#peopleAmount')

const selectTipBtns = document.querySelectorAll('.select-tip__btn')

const amountResult = document.querySelector('#amountResult')
const totalResult = document.querySelector('#totalResult')

const resetBtn = document.querySelector('#resetBtn')

const peopleError =document.querySelector('#peopleError')

let billValue = 0
let tipValue = 5
let peopleAmountValue = 0

function calculateTip(billValue, tipValue, peopleAmountValue) {
	let amount = 0
	let total = 0

	if (peopleAmountValue > 0) {
		amount = (billValue * tipValue / 100) / peopleAmountValue
		total = billValue / peopleAmountValue + amount
	}
	
	if (isNaN(amount) && isNaN(total)) {
		amount = 0
		total = 0
	}
	
	amountResult.textContent = `$${amount.toFixed(2)}`  
	totalResult.textContent = `$${total.toFixed(2)}`
}

function setTip() {
	customTip.addEventListener('input', () => {
		if (customTip.value.trim() != '') {
			tipValue = parseFloat(customTip.value)
			calculateTip(billValue, tipValue, peopleAmountValue)
		}
		checkResetBtn()
	})
	selectTipBtns.forEach(tipBtn => {
		tipBtn.addEventListener('click', () => {
			selectTipBtns.forEach(tipBtn => {
				tipBtn.classList.remove('active')
			})
			if (tipBtn != customTip) {
				tipBtn.classList.add('active')
			}
			tipValue = parseFloat(tipBtn.value)
			customTip.value = ''
			calculateTip(billValue, tipValue, peopleAmountValue)
			checkResetBtn()
		})
	})

	bill.addEventListener('input', () => {
		billValue = parseFloat(bill.value)
		calculateTip(billValue, tipValue, peopleAmountValue)
		checkResetBtn()
	})

	peopleAmount.addEventListener('input', () => {
		peopleAmountValue = parseFloat(peopleAmount.value)

		if (peopleAmountValue == 0) {
			peopleAmount.classList.add('error')
			peopleError.classList.add('error')
			peopleError.style.visibility = 'visible'
		} else {
			peopleAmount.classList.remove('error')
			peopleError.classList.remove('error')
			peopleError.style.visibility = 'hidden'
		}
		calculateTip(billValue, tipValue, peopleAmountValue)
		checkResetBtn()
	})
}

function checkResetBtn() {
	if (bill.value == 0 && peopleAmount.value == 0) {
		resetBtn.classList.add('unavailable')
	} else {
		resetBtn.classList.remove('unavailable')
	}
}

function resetTip() {
	bill.value = ''
	billValue = 0

	customTip.value = ''
	tipValue = 5

	peopleAmount.value = ''
	peopleAmountValue = 1

	amountResult.textContent = '$0.00'
	totalResult.textContent = '$0.00'
}

setTip()
checkResetBtn()

resetBtn.addEventListener('click', () => {
	resetTip()
})