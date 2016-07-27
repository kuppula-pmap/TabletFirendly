// Dependencies.
import React from 'react';
import { FormControls } from 'react-bootstrap';
import moment from 'moment';


// Define class.
class StaticDocumentDetails extends React.Component {

  // Render method.
  render() {
    const {
      data,
      // lookups
    } = this.props;


    let documentData = data ? data : [];
    // Get data from document reducer.
    const title = documentData.Title;
    const internalId = documentData.InternalId;
    const primaryFolder = documentData.PrimaryFolder ? documentData.PrimaryFolder.name : null;
    const displayFolders = documentData.DisplayFolders ? documentData.DisplayFolders.map(item => item.name).join(', ') : null;
    const departmants = documentData.Departments ? documentData.Departments.map(item => item.name).join(', ') : null;
    const owner = documentData.Owner ? documentData.Owner.Description : null;
    const coordinator = documentData.Coordinator ? documentData.Coordinator.Description : null;
    const businessProcess = documentData.BusinessProcess ? documentData.BusinessProcess.Description : null;
    const level = documentData.Level ? documentData.Level.Description : null;
    const isAutoRelease = documentData.IsAutoRelease ? 'Yes' : 'No';
    const isPublishOnlyPDFs = documentData.IsPublishOnlyPDFs ? 'PDF' : 'Original Format';
    // const privateViewersOptions = lookups.PrivateViewers ? lookups.PrivateViewers.map(item => item.Description).join(', ') : null;
    const privateViewersOptions = documentData.PrivateViewers ? documentData.PrivateViewers.map(item => item.Description).join(', ') : null;
    const visibilityType = documentData.VisibilityType ? documentData.VisibilityType.Description : null;
    const showPrivateViwers = visibilityType === 'Public' ? false : true;
    // Private viewers missing
    const targetVersionNumber = documentData.TargetVersionNumber;
    const type = documentData.Type ? documentData.Type.Description : null;
    const description = documentData.Description;
    const keywords = documentData.Keywords ? documentData.Keywords.join(', ') : null;
    const referenceDocuments = documentData.ReferenceDocuments ? documentData.ReferenceDocuments.map(item => item.Description).join(', ') : null;
    const regulatoryReferences = documentData.RegulatoryReferences ? documentData.RegulatoryReferences.join(', ') : null;

    const reviewInterval = documentData.PeriodicReviewInterval ? documentData.PeriodicReviewInterval : null;
    const reviewIntervalTypes = documentData.PeriodicReviewIntervalType ? documentData.PeriodicReviewIntervalType.Description : null;
    const reviewPeriod = reviewInterval && reviewIntervalTypes ? reviewInterval + ' ' + reviewIntervalTypes : '';
    const periodicReviewStartDate = moment(documentData.PeriodicReviewStartDate).isValid() ?
      moment(documentData.PeriodicReviewStartDate).format('L')
    : null;

    const retentionPeriodInterval = documentData.RetentionPeriodInterval ? documentData.RetentionPeriodInterval : null;
    const retentionPeriodType = documentData.RetentionPeriodType ? documentData.RetentionPeriodType.Description : null;
    const retentionPeriod = retentionPeriodInterval && retentionPeriodType ? retentionPeriodInterval + ' ' + retentionPeriodType : '';
    const documentState = documentData.DocumentState ? documentData.DocumentState.CurrentStateDescription : null;
    const updatedByName = documentData.UpdatedByName;
    const updatedDate = documentData.UpdatedDate ? moment(documentData.UpdatedDate).format('L') : '-';
    const createdByName = documentData.CreatedByName;
    const createdDate = documentData.CreatedDate ? moment(documentData.CreatedDate).format('L') : '-';
    const isFinal = documentData.IsFinal;

    return (
      <div>

        <div className={`${title ? null : 'text-muted'}`}>
          <FormControls.Static label="Title" value={title} />
        </div>

        <div className={`${internalId ? null : 'text-muted'}`}>
          <FormControls.Static label="Internal Document ID" value={internalId} />
        </div>

        <div className={`${primaryFolder ? null : 'text-muted'}`}>
          <FormControls.Static label="Primary Folder" value={primaryFolder} />
        </div>

        <div className={`${displayFolders ? null : 'text-muted'}`}>
          <FormControls.Static label="Additional Display Folders" value={displayFolders} />
        </div>

        <div className={`${departmants ? null : 'text-muted'}`}>
          <FormControls.Static label="Department" value={departmants} />
        </div>

        <div className={`${owner ? null : 'text-muted'}`}>
          <FormControls.Static label="Document Owner" value={owner} />
        </div>

        <div className={`${coordinator ? null : 'text-muted'}`}>
          <FormControls.Static label="Document Coordinator" value={coordinator} />
        </div>

        <div className={`${businessProcess ? null : 'text-muted'}`}>
          <FormControls.Static label="Business Process" value={businessProcess}/>
        </div>

        <div className={`${level ? null : 'text-muted'}`}>
          <FormControls.Static label="Document Level" value={level} />
        </div>

        <div className={`${isAutoRelease ? null : 'text-muted'}`}>
          <FormControls.Static label="Auto Release Document" value={isAutoRelease}/>
        </div>

        <div className={`${isPublishOnlyPDFs ? null : 'text-muted'}`}>
          <FormControls.Static label="Published Format" value={isPublishOnlyPDFs}/>
        </div>

        <div className={`${visibilityType ? null : 'text-muted'}`}>
          <FormControls.Static label="Document View" value={visibilityType}/>
        </div>

        {showPrivateViwers ? <FormControls.Static label="Private Viewers" value={privateViewersOptions}/> : null}

        <div className={`${targetVersionNumber ? null : 'text-muted'}`}>
          <FormControls.Static label="Version" value={targetVersionNumber} />
        </div>

        <div className={`${type ? null : 'text-muted'}`}>
          <FormControls.Static label="Document Type" value={type} />
        </div>

        <div className={`${description ? null : 'text-muted'}`}>
          <FormControls.Static label="Description" value={description} />
        </div>

        <div className={`${keywords ? null : 'text-muted'}`}>
          <FormControls.Static label="Keywords/Tags" value={keywords} />
        </div>

        <div className={`${referenceDocuments ? null : 'text-muted'}`}>
          <FormControls.Static label="Reference Documents" value={referenceDocuments} />
        </div>

        <div className={`${regulatoryReferences ? null : 'text-muted'}`}>
          <FormControls.Static label="Regulatory References" value={regulatoryReferences} />
        </div>

        <div className={`${reviewPeriod.length > 1 ? null : 'text-muted'}`}>
          <FormControls.Static label="Periodic Review Frequency" value={reviewPeriod} />
        </div>

        {isFinal && periodicReviewStartDate ?
          <FormControls.Static label="Periodic Review Start Date" value={periodicReviewStartDate} />
        : null}

        <div className={`${retentionPeriod.length > 1 ? null : 'text-muted'}`}>
          <FormControls.Static label="Retention Period" value={retentionPeriod} />
        </div>

        <div className={`${documentState ? null : 'text-muted'}`}>
          <FormControls.Static label="Status" value={documentState} />
        </div>

        {createdByName ? <FormControls.Static label="Uploaded/Referenced By" value={createdByName} /> : null}

        {createdDate.length > 1 ? <FormControls.Static label="Date Uploaded/Referenced" value={createdDate} /> : null}

        {updatedByName ? <FormControls.Static label="Modified By" value={updatedByName} /> : null}

        {updatedDate.length > 1 ? <FormControls.Static label="Modified Date" value={updatedDate} /> : null}

      </div>
    );
  }
}

// Validation.
StaticDocumentDetails.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  lookups: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

// Export.
export default StaticDocumentDetails;
