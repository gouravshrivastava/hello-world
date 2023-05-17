import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fetchLookupData from '@salesforce/apex/CustomLookupController.fetchLookupData';

const SEARCH_DELAY = 300; // Wait 300 ms after user stops typing then, perform search

export default class CustomLookup extends LightningElement {
	@api label;
	@api selectedRecords = [];
	@api placeholder = 'search here';
	@api isMultiEntry = false;
	@api objectName;
	@api firstField;
	@api secondField;
	@api iconName = 'standard:default';
	@api limit = 6;
	@api index;
	
	searchTerm = '';
	searchResults = [];
	results;
	hasFocus = false;

	cleanSearchTerm;
	blurTimeout;
	searchThrottlingTimeout;

	showPartDescription = false;
	showPostalDetails = false;
	connectedCallback(){
	
	}
	//fetch data from apex based on object,field and search key
	dataSearch(){
		const searcher = this.getSearcher();
		fetchLookupData({searcher})
		.then(data => {
			this.results = data;
		   	this.searchResults = data;
		})
		.catch(error => {
			this.notifyUser('Lookup Error', 'An error occured while searching Object name', 'error');
			console.error('Lookup error', JSON.stringify(error));
		});
	}

 

	getSearcher () {
		let selectedRecId = [];

		for(let i = 0; i < this.selectedRecords.length; i++){
			selectedRecId.push(this.selectedRecords[i].Id);
		}

		return {
		  searchTerm: this.cleanSearchTerm,
		  objectName: this.objectName,
		  lim: this.limit,
		  selectedRecId: selectedRecId
		}
	}

   notifyUser(title, message, variant) {
		 // Notify via toast
		const toastEvent = new ShowToastEvent({ title, message, variant });
		this.dispatchEvent(toastEvent);
	}

	isSelectionAllowed() {
		//if it is multiple selection return true
		if (this.isMultiEntry) {
			return true;
		}
		return !this.hasSelection();  // if selectedrecord > 0 ==> false
	}

	hasResults() {
		return this.searchResults.length > 0;
	}

	//check if record is selected and length greater than 0...
	hasSelection() {
		return this.selectedRecords.length > 0;
	}



	//handle the input
	handleInput(event) {
		//if it single selection and we already selected one record than it will return
		if (!this.isSelectionAllowed()) {
			return;
		}
		
		this.searchTerm = event.target.value;
	   	const searchEvent = new CustomEvent("getsearchvalue", {data:this.searchTerm});
		this.dispatchEvent(searchEvent);

		// Compare clean new search term with current one and abort if identical
		const newCleanSearchTerm = this.searchTerm.trim().replace(/\*/g, '').toLowerCase();
		if (this.cleanSearchTerm === newCleanSearchTerm) {
			return;
		}

		// Save clean search term
		this.cleanSearchTerm = newCleanSearchTerm;
		// Apply search throttling (prevents search if user is still typing)
		if (this.searchThrottlingTimeout) {
			clearTimeout(this.searchThrottlingTimeout);
		}

		this.searchThrottlingTimeout= setTimeout(()=>{
			this.dataSearch()
		}, SEARCH_DELAY);

	}

	//handle the clicked record on result list box
	handleResultClick(event) {
		const recordId = event.currentTarget.dataset.recid;
		var objId = event.target.getAttribute('data-recid');
		// Save selectedRecords
		let selectedItem = this.results.find(result => result.Label === objId);
		if (!selectedItem) {
			return;
		}
		const newSelection = [...this.selectedRecords];
		newSelection.push(selectedItem);
		this.selectedRecords = newSelection;
		// Reset search
		this.searchTerm = '';
		this.searchResults = [];

		// Notify parent components that selectedRecords has changed
		this.lookupUpdatehandler(this.selectedRecords);

		}

	//remove multiple selected record if isMultiEntry true
	handleRemoveSelectedItem(event) {
		const recordId = event.currentTarget.name;
		this.selectedRecords = this.selectedRecords.filter(item => item.Id !== recordId);
		
		// Notify parent components that selectedRecords has changed
		this.lookupUpdatehandler(this.selectedRecords);
	}
	
	//remove single selected record if isMultiEntry false
	 @api handleClearSelection() {
		this.selectedRecords =[];
	   
		// Notify parent components that selectedRecords has changed
		this.lookupUpdatehandler(this.selectedRecords);
	   
	}

	// send selected lookup record to parent component using custom event
	lookupUpdatehandler(value){ 
		const selectedEvent = new CustomEvent('selected',{
			detail: {
				data : value
			}

		});
		this.dispatchEvent(selectedEvent);
	}

	handleComboboxClick() {
		// Hide combobox immediately
		if (this.blurTimeout) {
			window.clearTimeout(this.blurTimeout);
		}
		this.hasFocus = false;
	}

	handleFocus() {
		// Prevent action if selectedRecords is not allowed
		//return on single selection
		if (!this.isSelectionAllowed()) {
			return;
		}
		this.hasFocus = true;
	}

	handleBlur() {
		// Prevent action if selectedRecords is not allowed
		//return on single selection
		if (!this.isSelectionAllowed()) {
			return;
		}
		// Delay hiding combobox so that we can capture selected result
		this.blurTimeout = window.setTimeout(() => {
				this.hasFocus = false;
				this.blurTimeout = null;
			},
			300
		);
	}


// STYLE EXPRESSIONS

	get getContainerClass() {
		let css = 'slds-combobox_container ';

		if (this.hasFocus && this.hasResults()) {
			css += 'slds-has-input-focus ';
		}
		return css;
	}

	get getDropdownClass() {
		let css = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ';
		if (this.hasFocus && this.cleanSearchTerm && this.cleanSearchTerm.length >= 1) {
			css += 'slds-is-open';
		}
		return css;
	}

	get getInputClass() {
		let css = 'slds-input slds-combobox__input has-custom-height ';
		if (!this.isMultiEntry) {
			css += 'slds-combobox__input-value '
				+ (this.hasSelection() ? 'has-custom-border' : '');
		}
		return css;
	}

	get getComboboxClass() {
		let css = 'slds-combobox__form-element slds-input-has-icon ';
		if (this.isMultiEntry) {
			css += 'slds-input-has-icon_right';
		} else {
			css += (this.hasSelection() ? 'slds-input-has-icon_left-right' : 'slds-input-has-icon_right');
		}
		return css;
	}

	get getSearchIconClass() {
		let css = 'slds-input__icon slds-input__icon_right ';
		if (!this.isMultiEntry) {
			css += (this.hasSelection() ? 'slds-hide' : '');
		}
		return css;
	}

	get getClearSelectionButtonClass() {
		return (
			'slds-button slds-button_icon slds-input__icon slds-input__icon_right ' +
			(this.hasSelection() ? '' : 'slds-hide')
		);
	}

	get getSelectIconName() {
		return this.hasSelection() ? this.iconName : 'standard:default';
	}

	get getSelectIconClass() {
		return 'slds-combobox__input-entity-icon ' + (this.hasSelection() ? '' : 'slds-hide');
	}

	get getInputValue() {
		if (this.isMultiEntry) {
			return this.searchTerm;
		}
		console.log('getInputValue');
		if(this.hasSelection()){
			return this.selectedRecords[0].DeveloperName;
		}
		return this.searchTerm
	}

	get isInputReadonly() {
		if (this.isMultiEntry) {
			return false;
		}
		return this.hasSelection();
	}

	get isExpanded() {
		return this.hasResults();
	}
}