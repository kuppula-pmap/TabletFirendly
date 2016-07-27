// Workflow Command.
export default function(globalSettings, dmDocument, cmdName) {
  const documentData = dmDocument ? dmDocument.items : [];
  // Document state.
  const documentState = documentData.DocumentState;
  const availableCommands = documentState ? documentState.AvailableCommands : null;

  let cmdObject = null;

  if (availableCommands) {
    availableCommands.forEach(command => {
      if (command.Name === cmdName) {
        //
        const documentVersionUid = documentData.TargetVersionUid;
        const uid = documentData.Uid;
        // User data.
        const userId = globalSettings.userId;
        // Set blank initial object.
        cmdObject =
        {
          DocumentVersionUid: documentVersionUid,
          DocumentUid: uid,
          WorkflowCommand: cmdName,
          ApprovalUserId: userId,
          Comments: null
        };
      }
    });
  }

  return cmdObject;
}
