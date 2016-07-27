// Dependencies.
import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../../components/Loader';
import ErrorMessage from '../../../../../components/ErrorMessage';

// Components.
import TaskListHeader from './TaskListHeader';
import TaskListCards from './TaskListCards';
import { fetchTasks } from '../../../redux/actions/tasks-actions';


// Define class.
class TaskList extends React.Component {
  constructor(props) {
    // Pass `props` into scope.
    super(props);

    this.state = {
      selectedKey: 'default',
    };
  }

  componentDidMount() {
    const { dispatch, globalSettings } = this.props;
    if (globalSettings.authorizationToken) {
      dispatch(fetchTasks());
    }
  }

  handleSelectChange(key) {
    this.setState({ selectedKey: key });
  }


  // Render method.
  render() {
    const { dmTasks } = this.props;

    // Task data.
    const taskData = dmTasks.items ? dmTasks.items : null;

    // Task fetch error.
    const didInvalidate = dmTasks ? dmTasks.didInvalidate : null;
    const taskDataError = dmTasks ? dmTasks.error : null;


    return (
      <div>
        {didInvalidate && taskDataError ?
          <div className="sidebar-details">
            <ErrorMessage data={taskDataError} codeException={401} />
          </div>
        : null}

        {dmTasks.isFetching && taskData && !didInvalidate ?
          <Loader size={16} padding="0 0 10px" theme="dark" />
        :
          <div>
            <TaskListHeader data={taskData} selectedItem={this.state.selectedKey} onSelectItem={this.handleSelectChange.bind(this)} />
            <TaskListCards data={taskData} selectedItem={this.state.selectedKey} />
          </div>
        }
      </div>
    );
  }
}

// propTypes.
TaskList.propTypes = {
  dispatch: React.PropTypes.func,
  dmTasks: React.PropTypes.object,
  globalSettings: React.PropTypes.object,
};
const mapStateToProps = (state) => ({
  dmTasks: state.dmTasks,
  globalSettings: state.globalSettings
});

// Export.
export default connect(mapStateToProps)(TaskList);
