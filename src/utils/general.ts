import domtoimage from 'dom-to-image';
/**
 * @function copyCodeToClipboard
 * @summary Allows you to copy to clipboard
 * @param {string} attribute - The attribute name of the generator element
 * @param {HTMLElement} outputElement - Element to copy the element from
 * @return {void} Nothing
 */
export function copyCodeToClipboard(
	attribute: string,
	outputElement: HTMLElement,
): void {
	const copyCodeButton = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-code]`)
	);
	copyCodeButton.addEventListener('click', (): void => {
		actOnGenerator();
	});

	function actOnGenerator() {
		switch (attribute) {
			case 'pic-text':
				let codeToCopy: string = `
      div {
        background-position: ${outputElement.style.backgroundPosition};
        background-size: ${outputElement.style.backgroundSize};
        background-repeat: ${outputElement.style.backgroundRepeat};
        background-clip: ${outputElement.style.backgroundClip};
        -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
        -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
      }
    `;
				const permissionName = 'clipboard-write' as PermissionName;
				navigator.permissions.query({ name: permissionName }).then((result) => {
					if (result.state === 'granted' || result.state === 'prompt') {
						navigator.clipboard
							.writeText(codeToCopy)
							.then(() => {
								alert('copied to clipboard');
							})
							.catch(() => alert('error copying to clipboard'));
					}
				});
				break;
			case 'gradient-text':
				break;
		}
	}
}

/**
 * @function countForText
 * @summary Counts the number of text in the input element
 * @param inputElement {HTMLInputElement} - The input element that holds the text
 * @return {void} Nothing
 */
export function countForText(inputElement: HTMLInputElement): void {
	const countElement = <HTMLElement>document.querySelector('.count > span');
	inputElement.addEventListener('keydown', (): void => {
		countElement.innerText = `${inputElement.value.length + 1}`;
	});
}

export function downloadImage(attribute: string): void {
	const outputImage = <HTMLElement>document.querySelector('.output');
	const getDownloadJpg = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-jpg]`)
	);
	const getDownloadSvg = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-svg]`)
	);

	getDownloadJpg.addEventListener('click', () => {
		domtoimage.toJpeg(outputImage, { quality: 0.95 }).then((dataUrl) => {
			const link = createDownloadLink('pic-text.jpeg', dataUrl);
			link.click();
		});
	});

	getDownloadSvg.addEventListener('click', () => {
		domtoimage.toSvg(outputImage).then((dataUrl) => {
			const link = createDownloadLink('pic-text.svg', dataUrl);
			link.click();
		});
	});
}

function createDownloadLink(fileName: string, url: string) {
	const link = document.createElement('a');
	link.download = fileName;
	link.href = url;
	return link;
}
