// Generator Modules
import { picTextGenerator } from './utils/pic-text';
import { gradientTextGenerator } from './utils/gradient-text';
import { downloadImage } from './utils/general';

import * as FilePond from 'filepond';

/**
 * All Variables
 */
let attributeValue: string | null = null;
let isOpen: boolean;
// Elements
const generators = document.querySelectorAll('[data-gen]');
const closeModalElement = document.getElementById('close-modal');
const modalContainerElement = <HTMLElement>(
	document.querySelector('.modal-container')
);

/**
 * All types
 */
type Display = 'grid' | 'flex' | 'none';

// Close button for modals
closeModalElement?.addEventListener('click', (): void => {
	isOpen = false;

	isVisible(isOpen);

	const getImageEntryElement = <HTMLInputElement>(
		document.getElementById(`pic-text-file`)
	);
	getImageEntryElement.setAttribute('value', '');
	getImageEntryElement.setAttribute('src', '');
	FilePond.destroy(getImageEntryElement);

	if (attributeValue === null) return;
	removeOrAddGeneratorContent(attributeValue, 'none');
});

// adding an event listeners to all generators card
generators.forEach((generator) => {
	generator?.addEventListener('click', (): void => {
		isOpen = true;
		isVisible(isOpen);
		const checking = generator.getAttribute('data-gen');
		if (checking === null) return;

		attributeValue = checking;
		checkingIfGeneratorExists(attributeValue);
	});
});

/**
 * @function checkingIfGeneratorExists
 * @summary Check if the attribute value exists
 * @param {string | null} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function checkingIfGeneratorExists(attribute: string | null): void {
	if (attribute === null) return;

	generatorsFunction(attribute);
	downloadImage(attribute);
	changeHeaderText(attribute);
}

/**
 * @function changeHeaderText
 * @summary Change the header text of the generator based on the attribute value
 * @param {string} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function changeHeaderText(attribute: string): void {
	const modalHeaderTextElement = <HTMLElement>(
		document.getElementById('heading-text-modal')
	);

	attribute = attribute.charAt(0).toUpperCase() + attribute.slice(1);
	modalHeaderTextElement.innerText = `${attribute} Generator`;
}

/**
 * @function isVisible
 * @summary uses the value of isOpen to change the visibility of the modal
 * @param isOpen {boolean} - the variable for if the modal is open or closed
 * @return {void} nothing
 */
function isVisible(isOpen: boolean): void {
	if (isOpen) {
		modalContainerElement.style.display = 'grid';
	} else {
		modalContainerElement.style.display = 'none';
	}
}

/**
 * @function generatorsFunction
 * @summary a function with the collection of functions for generators
 * @param {string} attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string): void {
	removeOrAddGeneratorContent(attribute, 'flex');
	switch (attribute) {
		case 'pic-text':
			picTextGenerator(attribute);
			break;
		case 'gradient-text':
			gradientTextGenerator(attribute);
			break;
	}
}

/**
 * @function removeOrAddGeneratorContent
 * @summary use to toggle visibilty of content in generators
 * @param {string} attribute - The attribute name of the generator element
 * @param {Display} display - display type
 * @return {void} Nothing
 */
function removeOrAddGeneratorContent(
	attribute: string,
	display: Display,
): void {
	const generator = <HTMLElement>(
		document.querySelector(`[data-modal = ${attribute}]`)
	);
	generator.style.display = `${display}`;
}
