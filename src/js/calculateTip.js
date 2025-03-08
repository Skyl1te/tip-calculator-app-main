const bill = document.querySelector('#bill')
const customTip = document.querySelector('#customTip')
const peopleAmount = document.querySelector('#peopleAmount')

const selectTipBtns = document.querySelectorAll('.select-tip__btn')

const amountResult = document.querySelector('#amountResult')
const totalResult = document.querySelector('#totalResult')

const resetBtn = document.querySelector('#resetBtn')

let billValue = 0
let tipValue = 5
let peopleAmountValue = 1

function calculateTip(billValue, tipValue, peopleAmountValue) {
	let amount = (billValue * tipValue / 100) / peopleAmountValue
	let total = billValue / peopleAmountValue + amount

	amountResult.textContent = `$${amount.toFixed(2)}`  
	totalResult.textContent = `$${total.toFixed(2)}`
}

function setTip() {
	customTip.addEventListener('input', () => {
		if (customTip.value.trim() != '') {
			tipValue = parseFloat(customTip.value)
			calculateTip(billValue, tipValue, peopleAmountValue)
		}
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
		})
	})

	bill.addEventListener('input', () => {
		billValue = parseFloat(bill.value)
		calculateTip(billValue, tipValue, peopleAmountValue)
	})

	peopleAmount.addEventListener('input', () => {
		peopleAmountValue = parseFloat(peopleAmount.value)
		calculateTip(billValue, tipValue, peopleAmountValue)
	})
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

resetBtn.addEventListener('click', () => {
	resetTip()
})