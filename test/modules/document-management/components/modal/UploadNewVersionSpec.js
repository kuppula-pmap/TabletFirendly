// import UploadNewVersion, { UploadNewVersionPure } from '../../../../../src/modules/document-management/components/modal/UploadNewVersion';
// import { mountComponent, shallowComponentWithProps } from '../../../../test_helper';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
//
// // import { toggleModal } from '../../../../../src/modules/document-management/redux/actions/ui-actions';
// describe('(Component) <UploadNewVersion />', () => {
//   let component;
//   const props = {
//     globalUi: {
//       isModalOpen: true,
//       modalView: 'DM_MODAL_UPLOAD_NEW_VERSION' }
//   };
//   const mockStore = configureMockStore([thunk]);
//   const fakeStore = mockStore(props);
//   beforeEach(() => {
//     component = mountComponent(UploadNewVersion, fakeStore);
//   });
//
//   it('Should be present after mounting', () => {
//     expect(component).toExist();
//   });
//
//   it('Should include a modal', () => {
//     expect(component.debug()).toIncludeJSX('</Modal>');
//   });
//
//   // it should have a dropzone component
//   it('Should include a dropzone component', () => {
//     component = shallowComponentWithProps(UploadNewVersionPure, props);
//     expect(component.debug())
//       .toIncludeJSX('</Dropzone>');
//   });
//
//   // it should have a close button
//
//   // it should have a continue button
//
//   // it should have a Reason field, that is required
//
//   // it should have a version label with major and minor checkboxes
//
//   // which function gets called when clicked?
// });
