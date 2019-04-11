String.prototype.toHHMMSS = function () {
	const sec_num = parseInt(this, 10);
	let hours   = Math.floor(sec_num / 3600);
	let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	let seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return (parseInt(hours.toString()) !== 0? hours+":" : "")+minutes+":"+seconds;
};