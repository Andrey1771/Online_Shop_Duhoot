const popupLinks = document.querySelectorAll('.popup__login-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; ++index)
	{
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup__login');

if(popupCloseIcon.length > 0) {//Stupid check?)
	for(let index = 0; index < popupCloseIcon.length; ++index)
	{
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e){
			popupClose(el.closest('.popup__login'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup)
{
	if(currentPopup && unlock) 
	{
		const popupActive = document.querySelector('.popup__login.open');
		if(popupActive)
		{
			popupClose(popupActive, false);
		} else
		{
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (e) {
			if(!e.target.closest('.popup__login__content')) {
				popupClose(e.target.closest('.popup__login'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true)
{
	if(unlock)
	{
		popupActive.classList.remove('open');
		if(doUnlock)
		{
			bodyUnLock();
		}
	}
}

function bodyLock()
{
	const lockPaddingValue = window.innerWidth - document.querySelector('.external__container').offsetWidth + 'px';


	for (let index = 0; index < lockPadding.length; ++index)
	{
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() 
{
	setTimeout(function() 
	{
		for(let index = 0; index < lockPadding.length; ++index)
		{
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');

		
	},);
	unlock = false;
	setTimeout(function() {
	unlock = true;
}, timeout);

}

document.addEventListener('keydown', function(e){
	if(e.which === 27){
		const popupActive = document.querySelector('.popup__login.open');
		popupClose(popupActive);
	}
});


(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();

(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;

  }

})();