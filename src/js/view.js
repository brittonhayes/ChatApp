document.addEventListener("DOMContentLoaded", () => {
	const friendsNav = document.getElementById("friends-nav");
	const friendsList = document.getElementById("friends-list");
	const main = document.getElementById("main");
	friendsNav.addEventListener("click", function() {
		friendsList.classList.toggle("nav-active");
		main.classList.toggle("main-active");
	});
});
