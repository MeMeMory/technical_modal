window.addEventListener('load', () => {
	const messageModal = () => {
		const btns = document.querySelectorAll('.isValidate')

		btns.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				// modal types = [info, warning, error, success]
				const type = e.target.dataset.type

				modalActions("Don't click me more", type)
			})
		})

		function onInitModal() {
			const body = document.querySelector('body')

			const container = document.createElement('div')
			container.classList.add('modal_container')

			body.appendChild(container)
			modalInteract(container)
		}

		onInitModal()

		function modalActions(message, type) {
			const container = document.querySelector('.modal_container')

			//Max modal count ton Screen
			const modalCount = checkModalCount(container)
			if (modalCount >= 4) return

			const [modal, modalBody] = createModalElements(type)
			container.appendChild(modal)

			modalBody.innerHTML = message

			setTimeout(() => {
				modal.classList.add('show')
			}, 0)

			setTimeout(() => {
				modal.classList.remove('show')
				modal.classList.add('removing')

				setTimeout(() => {
					modal.remove()
				}, 600)
			}, 4000)
		}

		function createModalElements(type) {
			const modal = document.createElement('div')
			modal.classList.add('message_modal')
			modal.classList.add(type)

			const modalBody = document.createElement('p')
			modalBody.classList.add('message_body')

			modal.appendChild(modalBody)

			return [modal, modalBody]
		}

		function modalInteract(container) {
			container.addEventListener('click', (e) => {
				const modal = e.target.closest('.message_modal')

				if (modal) {
					modal.classList.remove('show')
					modal.classList.add('removing')

					setTimeout(() => {
						modal.remove()
					}, 600)
				}
			})
		}

		function checkModalCount(container) {
			const modals = container.querySelectorAll('.message_modal')

			return modals.length
		}
	}

	messageModal()
})
