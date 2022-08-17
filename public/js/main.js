document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.sidenav')
	var instances = M.Sidenav.init(elems)
})

document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('select')
	var instances = M.FormSelect.init(elems)
})
document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('body')) {
		CKEDITOR.replace('body')
	}
})
