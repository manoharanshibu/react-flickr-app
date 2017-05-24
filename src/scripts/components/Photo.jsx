/**
 * Created by smanoharan on 22/05/2017.
 */
import React, {PropTypes} from 'react';
import './photo.css';

/**
 * PhotoImage
 */
export default class PhotoImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {load, title, url} = this.props;

    if (!load) {
      return (
        <div className="photo-placeholder"></div>
      );
    }

    return (
      <div>
        <div className="photo-container">
          <div className="photo-title">
            {title}
          </div>
        </div>
        <img
          alt={title}
          className="photo-img"
          src={url} />
      </div>
    );
  }
}

PhotoImage.propTypes = {
  load: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
