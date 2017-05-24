/**
 * Created by smanoharan on 22/05/2017.
 */
import React, {PropTypes} from 'react';
import Photo from './Photo.jsx';

/**
 * Item container
 */
export default class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: false
    };
  }

  /**
   * Display photo when the component is mounted
   */
  componentDidMount() {
    this.setState({
      displayImage: true
    });
  }

  render() {
    const {onSelect, photo} = this.props;
    return (
      <div
        className="photo"
        onClick={onSelect}
        ref="photo">
        <Photo
          load={this.state.displayImage}
          title={photo.title}
          url={photo.url} />
      </div>
    );
  }
}

ItemContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};
