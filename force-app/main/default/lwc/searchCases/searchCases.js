import {LightningElement,api,track,wire} from 'lwc';
import search from '@salesforce/apex/getCaseRecords.searchRecords';
const DELAY = 300;
export default class GlobalRecordSearch extends LightningElement {
	@track isLoading = false;
	@track selectedId;
	@track selectedName;
	@track selectedType;
	@track selectedIcon;
	@track records;
	@track isValueSelected;
	@track blurTimeout;
	searchTerm;
	@track objRecordId;
	@api recordId;
	value = 'All';
	label;
	//css
	@track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus ';
	@track inputClass = '';
	handleClick(event) {
		this.searchTerm = event.target.value;
		this.records = null;
		this.getvalues();
		this.inputClass = 'slds-has-focus';
		this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open ';
	}
	onBlur() {
			this.blurTimeout = setTimeout(() => {
					this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus '}, 300);
				}
	onSelect(event) {
					let selectedId = event.currentTarget.dataset.id;
					let selectedName = event.currentTarget.dataset.name;
					this.isValueSelected = true;
					this.selectedName = selectedName;
					this.selectedId = selectedId;
					for (let i = 0; i < this.records.length; i++) {
						if (this.records[i].Id == this.selectedId) {
							this.selectedIcon = this.records[i].Icon;
						}
					}
					alert('Selected Record Id--' + this.selectedId);
					if (this.blurTimeout) {
						clearTimeout(this.blurTimeout);
					}
					this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus ';
					const value = event.currentTarget.dataset.name;
				}
	handleRemovePill() {
					this.isValueSelected = false;
					this.searchTerm = '';
				}
	onChange(event) {
					this.searchTerm = event.target.value;
					this.getvalues();
				}
	getvalues() {
					if (this.searchTerm.length >= 2) {
						search({
								searchTerm: this.searchTerm,
								objectName: this.value
							})
							.then(result => {
								this.isLoading = true;
								this.records = result;
							})
					}
					if (this.searchTerm.length <= 0) {
						this.records = null;
					}
				}
			}