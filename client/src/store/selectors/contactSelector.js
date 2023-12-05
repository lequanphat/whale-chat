const contactsSelector = (state) => state.contacts.contacts;
const currentContactSelector = (state) => state.contacts.currentContact;
const contactsLoadingSelector = (state) => state.contacts.isLoading;
export { contactsSelector, currentContactSelector, contactsLoadingSelector };
